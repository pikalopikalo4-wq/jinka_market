const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();
const db = admin.firestore();

// 1. የክፍያ ማስጀመሪያ Function (Pay With Chapa)
exports.payWithChapa = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  try {
    const { amount, email, firstName, lastName, phone, items } = req.body;
    const CHAPA_SECRET_KEY = functions.config().chapa.secret_key;

    const tx_ref = `jinka-tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    await db.collection("orders").doc(tx_ref).set({
      tx_ref: tx_ref,
      customer_name: `${firstName} ${lastName}`,
      email: email || "",
      phone: phone,
      amount: Number(amount),
      status: "pending",
      items: items,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const chapaResponse = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        amount: amount,
        currency: "ETB",
        email: email,
        first_name: firstName,
        last_name: lastName,
        phone_number: phone,
        tx_ref: tx_ref,
        callback_url: `https://us-central1-${process.env.GCP_PROJECT}.cloudfunctions.net/chapaWebhook`,
        return_url: "https://jinkamarket.com/success.html",
        customization: {
          title: "ጂንካ ገበያ",
          description: "የእቃዎች ክፍያ"
        }
      },
      {
        headers: {
          Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (chapaResponse.data.status === "success") {
      res.status(200).json({
        checkout_url: chapaResponse.data.data.checkout_url,
        tx_ref: tx_ref
      });
    } else {
      res.status(400).json({ error: "Chapa initialization failed" });
    }
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 2. የክፍያ ማረጋገጫ Webhook Function (Chapa Webhook)
exports.chapaWebhook = functions.https.onRequest(async (req, res) => {
  try {
    const data = req.body;

    if (data.status === "success" || data.event === "charge.success") {
      const tx_ref = data.tx_ref;

      await db.collection("orders").doc(tx_ref).update({
        status: "completed",
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      console.log(`Transaction ${tx_ref} successfully marked as completed.`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    res.status(400).send("Webhook Error");
  }
});
'use client';

import React, { useState } from 'react';

export default function DriverIDGenerator() {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    service: '',
    address: '',
    phone: '',
    plate: '',
    expire: ''
  });

  const [photo, setPhoto] = useState(null);
  const [barcode, setBarcode] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleBarcode = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBarcode(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 bg-slate-100 min-h-screen">
      {/* 1. መረጃ መሙያ ፎርም */}
      <div className="w-full lg:w-80 bg-white p-5 rounded-lg shadow border border-slate-200 h-fit text-sm">
        <h3 className="font-bold text-slate-800 border-b pb-2 mb-4">📝 መረጃ ያስገቡ</h3>
        
        <div className="space-y-3">
          <div>
            <label className="block font-bold text-xs mb-1">ኮድ (ID Code)</label>
            <input type="text" name="code" onChange={handleChange} placeholder="JM-001" className="w-full p-2 border rounded focus:outline-none focus:border-sky-600 text-xs" />
          </div>

          <div>
            <label className="block font-bold text-xs mb-1">ሙሉ ስም</label>
            <input type="text" name="name" onChange={handleChange} placeholder="አበበ ከበደ" className="w-full p-2 border rounded focus:outline-none focus:border-sky-600 text-xs" />
          </div>

          <div>
            <label className="block font-bold text-xs mb-1">አገልግሎቱ</label>
            <input type="text" name="service" onChange={handleChange} placeholder="አሸከርካሪ / Delivery" className="w-full p-2 border rounded focus:outline-none focus:border-sky-600 text-xs" />
          </div>

          <div>
            <label className="block font-bold text-xs mb-1">አድራሻ</label>
            <input type="text" name="address" onChange={handleChange} placeholder="ጂንካ" className="w-full p-2 border rounded focus:outline-none focus:border-sky-600 text-xs" />
          </div>

          <div>
            <label className="block font-bold text-xs mb-1">ስልክ</label>
            <input type="text" name="phone" onChange={handleChange} placeholder="0911223344" className="w-full p-2 border rounded focus:outline-none focus:border-sky-600 text-xs" />
          </div>

          <div>
            <label className="block font-bold text-xs mb-1">ተርጋ ቁጥር</label>
            <input type="text" name="plate" onChange={handleChange} placeholder="AA-C 12345" className="w-full p-2 border rounded focus:outline-none focus:border-sky-600 text-xs" />
          </div>

          <div>
            <label className="block font-bold text-xs mb-1">የሰውየው ፎቶ (የፊት)</label>
            <input type="file" accept="image/*" onChange={handlePhoto} className="w-full text-xs" />
          </div>

          <hr className="my-3" />

          <div>
            <label className="block font-bold text-xs mb-1">የሚያበቃበት ዓ.ም (የጀርባው)</label>
            <input type="text" name="expire" onChange={handleChange} placeholder="2018" className="w-full p-2 border rounded focus:outline-none focus:border-sky-600 text-xs" />
          </div>

          <div>
            <label className="block font-bold text-xs mb-1 text-sky-600">📌 የጀርባ Barcode / QR ፎቶ</label>
            <input type="file" accept="image/*" onChange={handleBarcode} className="w-full text-xs" />
          </div>

          <button onClick={() => window.print()} className="w-full bg-sky-600 text-white font-bold py-2 rounded text-xs mt-2 hover:bg-sky-700 transition">
            🖨️ ፊት እና ጀርባ አትም (Print)
          </button>
        </div>
      </div>

      {/* 2. የመታወቂያ ካርዶች Preview */}
      <div>
        {/* FRONT SIDE */}
        <h3 className="font-bold text-slate-800 text-sm mb-2">🎴 የፊት ገጽ (Front)</h3>
        <div className="w-[360px] h-[230px] bg-white rounded-lg border border-slate-300 relative overflow-hidden shadow-md mb-6">
          <div className="h-[6px] bg-gradient-to-r from-black via-red-500 via-yellow-400 via-green-500 to-blue-600"></div>
          <div className="bg-sky-600 text-yellow-300 text-center font-bold text-xs py-1">
            የጂንካ ገበያ እቃ ማድረሻ (Delivery) አገልግሎት
          </div>
          
          <div className="bg-sky-700 px-3 py-1 flex justify-between items-center">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="circleClip">
                  <circle cx="50" cy="50" r="48"/>
                </clipPath>
                <g clipPath="url(#circleClip)">
                  <rect x="0" y="0" width="100" height="33.3" fill="#009A44"/>
                  <rect x="0" y="33.3" width="100" height="33.3" fill="#FED100"/>
                  <rect x="0" y="66.6" width="100" height="33.4" fill="#E4002B"/>
                </g>
                <circle cx="50" cy="50" r="46" fill="none" stroke="#FFFFFF" strokeWidth="4"/>
                <path d="M 30 65 L 30 45 L 42 35 L 72 35 L 80 48 L 80 65 C 80 67, 78 68, 75 68 L 70 68 C 70 73, 62 73, 62 68 L 48 68 C 48 73, 40 73, 40 68 L 35 68 C 32 68, 30 67, 30 65 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="2"/>
                <polygon points="44,38 70,38 66,48 44,48" fill="#0284c7"/>
                <polygon points="34,48 41,48 41,58 34,58" fill="#0284c7"/>
                <circle cx="44" cy="68" r="5" fill="#1e293b"/>
                <circle cx="66" cy="68" r="5" fill="#1e293b"/>
              </svg>
            </div>
            <div className="text-white font-bold text-xs">የመታወቂያ ካርድ</div>
            <div className="text-xs font-bold text-black bg-white px-1.5 py-0.5 rounded">
              ኮድ፦ {formData.code || '---'}
            </div>
          </div>

          <div className="flex p-2.5 gap-2.5">
            <div className="w-[80px] h-[96px] border-2 border-sky-600 bg-slate-100 flex items-center justify-center overflow-hidden">
              {photo ? <img src={photo} alt="Photo" className="w-full h-full object-cover" /> : <span className="text-[10px] text-slate-400">Photo</span>}
            </div>
            <div className="flex-1 text-[12px] space-y-1">
              <div className="flex"><span className="w-20 font-bold text-sky-600">ሙሉ፤ ስም</span><span className="flex-1 border-b border-sky-600 font-bold text-slate-800">{formData.name || '---'}</span></div>
              <div className="flex"><span className="w-20 font-bold text-sky-600">አገልግሎቱ</span><span className="flex-1 border-b border-sky-600 font-bold text-slate-800">{formData.service || '---'}</span></div>
              <div className="flex"><span className="w-20 font-bold text-sky-600">አድራሻ</span><span className="flex-1 border-b border-sky-600 font-bold text-slate-800">{formData.address || '---'}</span></div>
              <div className="flex"><span className="w-20 font-bold text-sky-600">ስልክ</span><span className="flex-1 border-b border-sky-600 font-bold text-slate-800">{formData.phone || '---'}</span></div>
              <div className="flex"><span className="w-20 font-bold text-sky-600">ተርጋ ቁጥር</span><span className="flex-1 border-b border-sky-600 font-bold text-slate-800">{formData.plate || '---'}</span></div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-sky-600 text-white text-center text-[11px] py-0.5 font-bold">
            የድርጅት ስልክ፦ 0945900829
          </div>
        </div>

        {/* BACK SIDE */}
        <h3 className="font-bold text-slate-800 text-sm mb-2">🎴 የጀርባ ገጽ (Back)</h3>
        <div className="w-[360px] h-[230px] bg-white rounded-lg border border-slate-300 relative overflow-hidden shadow-md">
          <div className="h-[6px] bg-gradient-to-r from-black via-red-500 via-yellow-400 via-green-500 to-blue-600"></div>
          <div className="h-[35px] bg-slate-800 mt-1"></div>
          <div className="p-2.5 text-[12px] text-slate-800 relative h-[160px]">
            <div className="text-right font-bold text-[11px] mb-2">
              የካርዱ ዋጋ የሚያበቃው፦ <span className="border-b border-black px-2">{formData.expire || '______'}</span> ዓ.ም.
            </div>

            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <div className="font-bold text-slate-900 text-xs mb-1">አስተዋጽኦ</div>
                <div className="text-[10px] text-slate-600 leading-snug">
                  ይህ ካርድ የአገልግሎቱ መታወቂያ ነው።<br />
                  ቢጠፋ በአድራሻው ይመልሱ።
                </div>
              </div>

              {/* Barcode/QR Box */}
              <div className="w-[75px] h-[75px] border border-dashed border-sky-600 bg-slate-50 rounded flex items-center justify-center overflow-hidden">
                {barcode ? (
                  <img src={barcode} alt="Barcode" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-[8px] text-slate-400">BarCode / QR</span>
                )}
              </div>
            </div>

            <div className="absolute bottom-2 right-3 text-center w-24">
              <div className="border-t border-slate-500 pt-0.5 text-[10px] text-slate-500">Signature</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
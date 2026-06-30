import { useState } from 'react';
import valiHotelLogo from '@/assets/Vali hotel.jpeg';
import sriKrishnaLogo from '@/assets/sri krishna.jpeg';
import elShaddaiLogo from '@/assets/El Shaddai.jpeg';
import skaarviLogo from '@/assets/Skaarvi.png';
import bethamcherlaLogo from '@/assets/Bethamcherla times.jpeg';
import googleLogo from '@/assets/Google.jpg';
import playStoreLogo from '@/assets/Play store.jpg';

const clients = [
  { name: 'Vali Hotel', logo: valiHotelLogo, shape: 'circle', fit: 'cover' },
  { name: 'Sri Krishna Collections', logo: sriKrishnaLogo, shape: 'circle', fit: 'cover' },
  { name: 'El Shaddai Grace', logo: elShaddaiLogo, shape: 'circle', fit: 'cover' },
  { name: 'Google', logo: googleLogo, shape: 'circle', fit: 'cover' },
  { name: 'Skaarvi', logo: skaarviLogo, shape: 'circle', fit: 'cover' },
  { name: 'Bethamcherla Times', logo: bethamcherlaLogo, shape: 'circle', fit: 'cover' },
  { name: 'Playstore', logo: playStoreLogo, shape: 'circle', fit: 'cover' },];

const TrustedBy = () => {
  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-6">
        <p className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase">Trusted By</p>
      </div>

      {/* Infinite Marquee */}
      <div className="relative w-full flex overflow-x-hidden group">
        {/* Gradient Masks for smooth fading on edges */}
        <div className="absolute inset-y-0 left-0 w-8 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex whitespace-nowrap items-center gap-8 sm:gap-24 px-4 sm:px-8 will-change-transform">
          {/* Duplicate the list 3 times to ensure infinite scroll covers large screens seamlessly */}
          {[...clients, ...clients, ...clients].map((client, i) => (
            <div key={i} className="flex items-center justify-center min-w-max">
              <ClientLogo client={client} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ClientLogo = ({ client }: { client: { name: string; logo: string; shape: string; fit: string } }) => {
  const [hasError, setHasError] = useState(false);

  let shapeClass = "rounded-3xl";
  if (client.shape === 'circle') shapeClass = "rounded-full";

  let sizeClass = "w-20 h-20 sm:w-32 sm:h-32";
  if (client.shape === 'landscape') sizeClass = "w-28 h-14 sm:w-48 sm:h-24";

  let imgClass = "w-full h-full ";
  imgClass += client.fit === 'cover' ? "object-cover" : "object-contain p-2 sm:p-4";

  return (
    <div className={`relative bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgba(20,184,166,0.15)] hover:border-teal-200 transition-all duration-500 flex items-center justify-center cursor-pointer ${sizeClass} ${shapeClass}`}>
      {!hasError ? (
        <img
          src={client.logo}
          alt={client.name}
          className={imgClass}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-xs sm:text-sm font-bold text-slate-400 text-center rounded-xl whitespace-normal p-2">
          {client.name}
        </div>
      )}
    </div>
  );
};

export default TrustedBy;

import { useEffect } from 'react';
import './AdBanner.css';

interface AdBannerProps {
  type: 'sidebar' | 'banner' | 'native';
  id: string; // Used as slot differentiator if needed
}

export default function AdBanner({ type }: AdBannerProps) {
  useEffect(() => {
    try {
      // Inicializa Google AdSense para este bloque de anuncio
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Google AdSense error', err);
    }
  }, []);

  // Configuramos el estilo dependiendo del tipo de anuncio para mantenerlo "no invasivo"
  const adStyles = {
    sidebar: { display: 'block', width: '100%', minHeight: '250px' },
    banner: { display: 'block', width: '100%', minHeight: '90px' },
    native: { display: 'block', width: '100%', minHeight: '120px' }
  };

  return (
    <div className={`ad-wrapper ad-wrapper--${type}`}>
      <span className="ad-label">Sponsored</span>
      {/* 
        NOTA PARA EL USUARIO:
        Reemplaza "ca-pub-[INSERTA_TU_ID_AQUI]" con tu Client ID real de Google AdSense.
        Reemplaza "1234567890" con tu Ad Slot ID real.
      */}
      <ins
        className="adsbygoogle"
        style={adStyles[type]}
        data-ad-client="ca-pub-[INSERTA_TU_ID_AQUI]"
        data-ad-slot="1234567890"
        data-ad-format={type === 'sidebar' ? 'vertical' : 'auto'}
        data-full-width-responsive="true"
      />
    </div>
  );
}

/**
 * Netlify Function: create-preference
 * Crea una preferencia de pago en MercadoPago y devuelve el init_point.
 * Requiere la variable de entorno: MERCADOPAGO_ACCESS_TOKEN
 */

const https = require('https');

exports.handler = async (event) => {
  // Solo POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!ACCESS_TOKEN) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Configuración de pago no disponible.' })
    };
  }

  // Detectar el origen para las back_urls
  const origin = (event.headers && (event.headers.origin || event.headers.referer))
    ? (event.headers.origin || new URL(event.headers.referer).origin)
    : 'https://landing-lauracortes.netlify.app';

  // Parsear cantidad si se envía desde el frontend (futuro: boletas múltiples)
  let quantity = 1, payerName = '', payerEmail = '', payerPhone = '';
  try {
    if (event.body) {
      const body = JSON.parse(event.body);
      if (body.quantity && Number.isInteger(body.quantity) && body.quantity > 0 && body.quantity <= 10) {
        quantity = body.quantity;
      }
      if (body.name)  payerName  = String(body.name).slice(0, 100);
      if (body.email) payerEmail = String(body.email).slice(0, 200);
      if (body.phone) payerPhone = String(body.phone).replace(/\D/g, '').slice(0, 20);
    }
  } catch (_) {}

  const preference = {
    items: [
      {
        id: 'EFEA-2026-BOLETA',
        title: 'Boleta LC — El Futuro Es Ahora',
        description: '11 y 12 de Abril 2026, Bogotá. Educación financiera e Inteligencia Artificial.',
        category_id: 'tickets',
        quantity: quantity,
        currency_id: 'COP',
        unit_price: 280000
      }
    ],
    payer: {
      name: payerName,
      email: payerEmail,
      phone: { area_code: '57', number: payerPhone }
    },
    back_urls: {
      success: `${origin}/success.html`,
      failure: `${origin}/failure.html`,
      pending: `${origin}/pending.html`
    },
    auto_return: 'approved',
    statement_descriptor: 'BE IMPARABLES',
    external_reference: `EFEA-${Date.now()}`,
    expires: false,
    metadata: {
      event: 'El Futuro Es Ahora',
      date: '2026-04-11',
      city: 'Bogota'
    }
  };

  const data = JSON.stringify(preference);

  return new Promise((resolve) => {
    const options = {
      hostname: 'api.mercadopago.com',
      path: '/checkout/preferences',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        try {
          const mp = JSON.parse(body);
          if (res.statusCode === 201) {
            resolve({
              statusCode: 200,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify({
                init_point: mp.init_point,
                sandbox_init_point: mp.sandbox_init_point,
                preference_id: mp.id
              })
            });
          } else {
            console.error('MercadoPago error:', body);
            resolve({
              statusCode: res.statusCode,
              body: JSON.stringify({ error: 'Error al procesar el pago. Intenta de nuevo.', details: mp })
            });
          }
        } catch (e) {
          resolve({ statusCode: 500, body: JSON.stringify({ error: 'Error interno.' }) });
        }
      });
    });

    req.on('error', (e) => {
      console.error('Request error:', e);
      resolve({ statusCode: 500, body: JSON.stringify({ error: 'Error de conexión con el servicio de pago.' }) });
    });

    req.write(data);
    req.end();
  });
};

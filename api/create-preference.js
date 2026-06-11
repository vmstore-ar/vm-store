export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        error: "Carrito vacío"
      });
    }

    const preferenceItems = items.map(item => ({
      title: item.name,
      quantity: Number(item.quantity),
      unit_price: Number(item.price),
      currency_id: "ARS"
    }));

    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
          items: preferenceItems,
          back_urls: {
            success: "https://TU-DOMINIO.com/success.html",
            failure: "https://TU-DOMINIO.com/failure.html",
            pending: "https://TU-DOMINIO.com/pending.html"
          },
          auto_return: "approved"
        })
      }
    );

    const data = await response.json();

    return res.status(200).json({
      init_point: data.init_point
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error creando preferencia"
    });
  }
}
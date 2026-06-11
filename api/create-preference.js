export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {
    const { items, exchangeRate } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        error: "Carrito vacío"
      });
    }

    const dollarRate = Number(exchangeRate) || 1300;

    const preferenceItems = items.map(item => ({
      title: item.name,
      quantity: Number(item.quantity),
      unit_price:
  item.productCurrency === "ARS"
    ? Math.round(Number(item.price))
    : Math.round(Number(item.price) * dollarRate),

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
            success: "https://vm-store-azure.vercel.app/home.html",
            failure: "https://vm-store-azure.vercel.app/home.html",
            pending: "https://vm-store-azure.vercel.app/home.html"
          },
          auto_return: "approved"
        })
      }
    );

    const data = await response.json();

    if (!data.init_point) {
      return res.status(500).json({
        error: "Mercado Pago no devolvió init_point",
        details: data
      });
    }

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
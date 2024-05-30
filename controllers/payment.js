const paymentRouter = require('express').Router();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51PGFj6EIeGzkZJ8JELx7dkPEYnKwJaNhl793VAxdDXi5t6kF6fcKyn4LIUoql8QPOy83jmjWQlrjkQwmIN8Eacnc00T0xki2j5'); // Reemplaza con tu clave secreta de Stripe

paymentRouter.post('/', async (req, res) => {
    const { paymentMethodId, amount } = req.body;

    try {
        // Crear un PaymentIntent con el ID del método de pago
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe espera los montos en centavos
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            return_url: 'http://localhost:3000/payment-success', // Cambia esto a la URL de tu página de éxito de pago
        });

        res.status(200).send({ success: true, paymentIntent });
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
});

module.exports = paymentRouter;

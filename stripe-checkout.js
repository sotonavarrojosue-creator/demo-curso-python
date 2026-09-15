// Stripe Checkout — Curso Python
// Redirige al Payment Link de Stripe para activar Premium

function openStripeCheckout() {
    // ========================================
    // REEMPLAZAR con tu Stripe Payment Link real
    // Obtenerlo en: dashboard.stripe.com/payment-links
    // ========================================
    const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/placeholder';

    // Guardar intención de compra
    if (typeof firebase !== 'undefined' && firebase.auth().currentUser) {
        localStorage.setItem('pending_premium_' + firebase.auth().currentUser.uid, 'true');
    }

    window.open(STRIPE_PAYMENT_LINK, '_blank');
}

// Verificar si el pago fue completado (llamar desde success.html)
async function activatePremium() {
    if (typeof firebase === 'undefined' || !firebase.auth().currentUser) {
        alert('Debés estar logueado para activar Premium');
        window.location.href = 'index.html';
        return;
    }

    const uid = firebase.auth().currentUser.uid;

    try {
        await firebase.firestore().collection('users').doc(uid).update({
            isPremium: true,
            premiumActivatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        localStorage.setItem('premium_' + uid, 'true');
        localStorage.removeItem('pending_premium_' + uid);

        return true;
    } catch(err) {
        console.error('Error activating premium:', err);
        return false;
    }
}

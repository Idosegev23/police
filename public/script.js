document.addEventListener('DOMContentLoaded', function() {
    const approveButton = document.getElementById('approveButton');
    const contactLink = document.getElementById('contactLink');

    if (approveButton) {
        approveButton.addEventListener('click', function() {
            Swal.fire({
                title: 'אשר הצעה',
                html: `
                    <input id="name" class="swal2-input" placeholder="שם">
                    <input id="role" class="swal2-input" placeholder="תפקיד">
                    <input id="email" class="swal2-input" placeholder="מייל">
                    <div class="swal2-checkbox-container">
                        <input type="checkbox" id="maintenance" class="swal2-checkbox">
                        <label for="maintenance">כולל תחזוקה</label>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: 'שלח הצעה',
                cancelButtonText: 'ביטול',
                preConfirm: () => {
                    const name = document.getElementById('name').value;
                    const role = document.getElementById('role').value;
                    const email = document.getElementById('email').value;
                    const maintenance = document.getElementById('maintenance').checked;

                    if (!name || !role || !email) {
                        Swal.showValidationMessage('אנא מלא את כל השדות');
                        return false;
                    }

                    return { name, role, email, maintenance };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    sendProposal(result.value);
                }
            });
        });
    }

    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            Swal.fire({
                title: 'צור קשר',
                html: `
                    <h2>כוכבית ארנון - מייסדת ומנכ"לית</h2>
                    <p>טלפון: <a href="tel:0523030009">052-303-0009</a></p>
                    <p>דוא"ל: <a href="mailto:kochavith.arnon@gmail.com">kochavith.arnon@gmail.com</a></p>
                    <h2>עידו שגב - מנכ"ל חטיבת AI</h2>
                    <p>טלפון: <a href="tel:0547667775">054-766-7775</a></p>
                    <p>דוא"ל: <a href="mailto:triroas@gmail.com">triroas@gmail.com</a></p>
                    <p style="margin-top: 20px; font-weight: bold;">תודה שיצרתם קשר עימנו - עידו וכוכבית</p>
                `,
                showConfirmButton: true,
                confirmButtonText: 'סגור',
            });
        });
    }

    function sendProposal(data) {
        const { name, role, email, maintenance } = data;
        const subject = 'אישור הצעת מחיר - מערכת תמלול ותרגום AI';
        const body = `
שלום כוכבית,

אני מאשר את הצעת המחיר עבור מערכת תמלול ותרגום AI לנתב קולי ארצי.

פרטי המאשר:
שם: ${name}
תפקיד: ${role}
מייל: ${email}

פרטי ההצעה:
${maintenance ? 'כולל תחזוקה - עלות שנתית: 10,000 ₪' : 'ללא תחזוקה - עלות חד פעמית: 7,500 ₪'}

אני מאשר את תנאי ההצעה כפי שפורטו.

בברכה,
${name}
        `;

        const mailtoLink = `mailto:kochavith.arnon@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;

        Swal.fire({
            title: 'הצעה נשלחה בהצלחה',
            text: 'מייל חדש נפתח עבורך. אנא שלח אותו כדי לאשר את ההצעה.',
            icon: 'success',
            confirmButtonText: 'סגור'
        });
    }
});
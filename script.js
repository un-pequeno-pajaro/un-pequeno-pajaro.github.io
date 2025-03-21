async function cargarDatos() {
    try {
        const response = await fetch('COPYS.json');
        const datos = await response.json();
        const tbody = document.getElementById('data-table').getElementsByTagName('tbody')[0];

        // Recorrer datos y agregar filas
        datos.forEach(item => {
            if (item.id == null || !item.title_ || !item.copy) return; // saltar bloques con valores vacíos

            const row = tbody.insertRow();

            const cell_id = row.insertCell(0);
            cell_id.classList.add('id-styles');
            cell_id.textContent = item.id;

            const cell_title = row.insertCell(1);
            cell_title.classList.add('title-styles');
            cell_title.textContent = item.title_;

            const cell_copy = row.insertCell(2);
            cell_copy.classList.add('copyS-styles');
            cell_copy.textContent = item.copy;
            cell_copy.style.whiteSpace = "pre-wrap";

            cell_copy.title = "Click para copiar";

            // Copiar al portapapeles
            cell_copy.addEventListener('click', () => {
                navigator.clipboard.writeText(item.copy)
                    .then(() => {
                        cell_copy.classList.add('copied');
                        setTimeout(() => {
                            cell_copy.classList.remove('copied');
                        }, 600);
                    })
            });
        });

        // Verificar si hay Id en la URL
        const hash = window.location.hash.substring(1);
        if (hash) {
            const rows = Array.from(tbody.getElementsByTagName('tr'));
            const row = rows.find(r => r.cells[0].textContent == hash);

            if (row) {
                const cell_id = row.cells[0,1,2];

                cell_id.classList.add('id_redirect');

                cell_id.addEventListener('animationend', () => {
                    cell_id.classList.remove('id_redirect');
                });

                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

    } catch (error) {
        console.error('Error al cargar el JSON:', error);
    }
}

cargarDatos();

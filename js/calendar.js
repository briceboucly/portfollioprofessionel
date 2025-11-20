// Calendrier exemple interactif pour 3 semaines avec pop-up créneaux

// Simulation de données de disponibilité (modifiable)
const exampleAvailability = {
  // "YYYY-MM-DD": [créneaux...]
};

// Génère des créneaux « restants » pour tous les lundis, mercredis, vendredis : 09h, 14h, 16h
function makeExampleAvailability(startDate, days) {
  const toPad = n => String(n).padStart(2, '0');
  const byDay = {};
  for (let i = 0; i < days; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const ymd = d.getFullYear() + '-' + toPad(d.getMonth() + 1) + '-' + toPad(d.getDate());
    if ([1,3,5].includes(d.getDay())) { // Lun/mer/ven disponibles
      byDay[ymd] = ['09:00', '14:00', '16:00'].filter(() => Math.random() > 0.33); // simule des créneaux restants aléatoires
    }
  }
  return byDay;
}
const today = new Date();
const availability = makeExampleAvailability(today, 21);

// Construction du calendrier (3 semaines)
function renderCalendar() {
  const cal = document.getElementById('calendar');
  cal.innerHTML = '';
  const daysOfWeek = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];
  let html = '<thead><tr>' + daysOfWeek.map(d => `<th>${d}</th>`).join('') + '</tr></thead><tbody>';
  let d = new Date(today);
  d.setHours(0,0,0,0);
  let start = new Date(d); start.setDate(d.getDate() - d.getDay());
  let dayCount = 0;
  let stop = false;

  for (let week = 0; week < 3; week++) {
    html += '<tr>';
    for (let dow = 0; dow < 7; dow++) {
      const dateStr = start.getFullYear() + '-' + String(start.getMonth()+1).padStart(2, '0') + '-' + String(start.getDate()).padStart(2, '0');
      if (start < today) {
        html += `<td class="unavailable">${start.getDate()}</td>`;
      } else if (availability[dateStr] && availability[dateStr].length>0) {
        html += `<td class="available" data-date="${dateStr}">${start.getDate()}</td>`;
      } else {
        html += `<td class="unavailable">${start.getDate()}</td>`;
      }
      start.setDate(start.getDate() + 1);
      dayCount++;
      if (dayCount >= 21) { stop = true; }
    }
    html += '</tr>';
    if (stop) break;
  }
  html += '</tbody>';
  cal.innerHTML = html;
}
// Affichage de la modale créneaux
function openModal(dateStr) {
  document.getElementById('modal-day').textContent = 'Disponibilités pour le ' +
    dateStr.split('-').reverse().join('/') ;
  const slotList = document.getElementById('slots-list');
  slotList.innerHTML = '';
  (availability[dateStr]||[]).forEach(cr => {
    const li = document.createElement('li');
    li.textContent = cr+' disponible';
    slotList.appendChild(li);
  });
  if (slotList.childNodes.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Aucun créneau disponible ce jour';
    slotList.appendChild(li);
  }
  document.getElementById('modal').style.display = 'flex';
}
// Fermeture modale
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function(){
  renderCalendar();
  document.getElementById('calendar').addEventListener('click', function(e){
    if (e.target.classList.contains('available')) {
      openModal(e.target.getAttribute('data-date'));
    }
  });
  document.getElementById('closeModal').onclick = closeModal;
  document.getElementById('modal').onclick = function(e){
    if (e.target === this) closeModal();
  }
});

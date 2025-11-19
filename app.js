/* * APP.JS
 * Logika utama aplikasi
 */

$(document).ready(function() {
  
  // --- 1. UTILITIES & TOAST SYSTEM (Pengganti Alert) ---
  function showToast(message, type = 'info') {
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    const toast = $(`
      <div class="toast ${type}">
        <span class="text-xl">${icon}</span>
        <div class="text-sm font-medium">${message}</div>
      </div>
    `);
    
    $('#toast-container').append(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.css('animation', 'fadeOut 0.5s forwards');
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  // --- 2. THEME MANAGER ---
  const savedTheme = localStorage.getItem('sm_theme') || 'light';
  $('body').addClass(`theme-${savedTheme}`);

  window.setTheme = function(themeName) {
    $('body').removeClass((i, c) => (c.match(/(^|\s)theme-\S+/g) || []).join(' '));
    $('body').addClass(`theme-${themeName}`);
    localStorage.setItem('sm_theme', themeName);
    showToast(`Tema diubah ke ${themeName}`, 'success');
  };

  // --- 3. NAVIGATION (SPA Style) ---
  function switchSection(targetId) {
    // Hide all sections
    $('section').addClass('hidden fade-in').hide();
    
    // Show target
    const target = $(`#${targetId}`);
    target.removeClass('hidden').fadeIn(300);
    
    // Update Active State
    $('.nav-link').removeClass('active');
    $(`.nav-link[data-target="${targetId}"]`).addClass('active');
    
    // Close sidebar on mobile
    $('#sidebar').addClass('-translate-x-full');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  $('.nav-link').on('click', function(e) {
    e.preventDefault();
    const target = $(this).data('target');
    switchSection(target);
  });

  // Mobile Menu Toggle
  $('#openMenu').on('click', () => $('#sidebar').removeClass('-translate-x-full'));
  $('#closeMenu').on('click', () => $('#sidebar').addClass('-translate-x-full'));

  // --- 4. FEATURE: RECOMMENDATION ENGINE ---
  $('#generateRec').on('click', function() {
    const inputs = {
      gender: $('#gender').val(),
      occasion: $('#occasion').val(),
      place: $('#place').val(),
      weather: $('#weather').val()
    };

    if (!inputs.gender || !inputs.occasion || !inputs.place || !inputs.weather) {
      showToast('Mohon lengkapi semua pilihan!', 'error');
      return;
    }

    // Logic Cerdas (Simulasi)
    let recommendation = "";
    let tips = "";

    // Weather Logic
    if (inputs.weather === 'rain') tips += "🌧️ Bawa payung & pakai sepatu waterproof. ";
    if (inputs.weather === 'cold') tips += "❄️ Layering is key! Pakai coat/jaket tebal. ";
    if (inputs.weather === 'hot') tips += "☀️ Pilih bahan katun/linen yang menyerap keringat. ";
    
    // Occasion Logic
    if (inputs.occasion === 'formal') {
      recommendation = inputs.gender === 'male' ? "Suit lengkap atau Kemeja + Chinos rapi." : "Blazer Set atau Midi Dress elegan.";
    } else if (inputs.occasion === 'hangout') {
      recommendation = inputs.place === 'outdoor' ? "T-shirt, Cargo Pants, dan Sneakers nyaman." : "Cardigan crop, High-waist jeans, dan aksesoris.";
    } else {
      recommendation = "Smart Casual: Kemeja flanel atau Polo shirt.";
    }

    $('#recResultContent').html(`
      <div class="font-bold text-lg text-blue-600 mb-2">Rekomendasi: ${recommendation}</div>
      <div class="text-sm text-gray-600 bg-blue-50 p-3 rounded border border-blue-100">💡 Tips: ${tips}</div>
    `);
    $('#recResult').removeClass('hidden').addClass('fade-in');
    showToast('Rekomendasi berhasil dibuat!', 'success');
  });

  // --- 5. FEATURE: STYLE DICTIONARY ---
  function renderStyles(filter = 'all') {
    const container = $('#styleGrid');
    container.empty();

    APP_DATA.styles.forEach(style => {
      if (filter !== 'all' && style.category !== filter) return;

      const card = `
        <div class="glass-card rounded-xl overflow-hidden cursor-pointer group" onclick="openStyleModal('${style.id}')">
          <div class="relative overflow-hidden h-48">
            <img src="${style.img}" alt="${style.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
          </div>
          <div class="p-4">
            <div class="text-xs font-bold text-blue-500 uppercase mb-1">${style.category}</div>
            <h3 class="text-lg font-bold mb-1 group-hover:text-blue-600 transition-colors">${style.name}</h3>
            <p class="text-sm opacity-70 truncate">${style.desc}</p>
          </div>
        </div>
      `;
      container.append(card);
    });
  }

  // Filter Buttons
  $('.filter-btn').on('click', function() {
    $('.filter-btn').removeClass('bg-blue-600 text-white').addClass('bg-gray-200 text-gray-700');
    $(this).removeClass('bg-gray-200 text-gray-700').addClass('bg-blue-600 text-white');
    renderStyles($(this).data('filter'));
  });

  // Modal Logic
  window.openStyleModal = function(id) {
    const style = APP_DATA.styles.find(s => s.id === id);
    if (!style) return;

    $('#modalTitle').text(style.name);
    $('#modalImg').attr('src', style.img);
    $('#modalDesc').text(style.desc);
    $('#modalTags').html(style.tags.map(t => `<span class="px-2 py-1 bg-gray-100 rounded-full text-xs">#${t}</span>`).join(' '));
    $('#modalItems').html(style.keyItems.map(i => `<li class="list-disc ml-4">${i}</li>`).join(''));
    
    $('#styleModal').removeClass('hidden').addClass('flex');
  };

  $('#closeModal, #styleModal').on('click', function(e) {
    if (e.target === this) $('#styleModal').addClass('hidden').removeClass('flex');
  });

  // --- 6. FEATURE: COLOUR HARMONY & CHART ---
  let harmonyChart;
  function initChart() {
    const ctx = document.getElementById('harmonyChart').getContext('2d');
    harmonyChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Primary', 'Secondary', 'Accent', 'Neutral'],
        datasets: [{
          data: [40, 30, 10, 20],
          backgroundColor: ['#ccc', '#ddd', '#eee', '#fff'],
          borderWidth: 0
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  function renderPalettes() {
    const container = $('#paletteGrid');
    APP_DATA.palettes.forEach(p => {
      const el = `
        <div class="glass-card p-3 rounded-xl cursor-pointer hover:border-blue-400 transition-colors" onclick="selectPalette('${p.id}')">
          <div class="flex h-12 rounded-lg overflow-hidden mb-2">
            ${p.colors.map(c => `<div style="background:${c}" class="flex-1"></div>`).join('')}
          </div>
          <div class="font-bold text-sm">${p.name}</div>
        </div>
      `;
      container.append(el);
    });
  }

  window.selectPalette = function(id) {
    const p = APP_DATA.palettes.find(x => x.id === id);
    $('#paletteName').text(p.name);
    $('#paletteDesc').text(p.desc);
    $('#paletteMatch').text(`Cocok untuk style: ${p.matchStyle}`);
    
    // Update Chart
    harmonyChart.data.datasets[0].backgroundColor = p.colors;
    harmonyChart.update();
    
    showToast(`Palette ${p.name} dipilih!`, 'info');
  };

  // --- 7. FEATURE: MIX & MATCH (Drag & Drop) ---
  function renderMixItems() {
    const container = $('#wardrobeGrid');
    APP_DATA.mixItems.forEach(item => {
      const el = `
        <div draggable="true" data-id="${item.id}" data-slot="${item.slot}" class="draggable-item glass-card p-2 rounded cursor-grab active:cursor-grabbing">
          <img src="${item.img}" class="w-full h-24 object-cover rounded mb-1 pointer-events-none">
          <div class="text-xs font-bold text-center pointer-events-none">${item.name}</div>
          <div class="text-[10px] text-center text-gray-500 uppercase pointer-events-none">${item.slot}</div>
        </div>
      `;
      container.append(el);
    });
  }

  // Native DnD Logic
  let draggedItem = null;

  $(document).on('dragstart', '.draggable-item', function(e) {
    draggedItem = {
      id: $(this).data('id'),
      slot: $(this).data('slot'),
      html: $(this).html() // Clone visual
    };
    e.originalEvent.dataTransfer.effectAllowed = 'copy';
  });

  $('.drop-slot').on('dragover', function(e) {
    e.preventDefault(); // Allow drop
    $(this).addClass('drag-over');
  });

  $('.drop-slot').on('dragleave', function() {
    $(this).removeClass('drag-over');
  });

  $('.drop-slot').on('drop', function(e) {
    e.preventDefault();
    $(this).removeClass('drag-over');
    
    const targetSlot = $(this).data('slot');

    if (draggedItem && draggedItem.slot === targetSlot) {
      // Success Drop
      $(this).html(draggedItem.html).addClass('bg-blue-50');
      $(this).find('img').removeClass('h-24').addClass('h-full'); // Adjust size
      showToast('Item terpasang!', 'success');
    } else {
      // Fail Drop
      showToast(`Salah slot! Ini untuk ${targetSlot}`, 'error');
    }
  });

  $('#resetMix').on('click', function() {
    $('.drop-slot').empty().removeClass('bg-blue-50').append('<span class="text-gray-400 text-xs">Drop here</span>');
    showToast('Outfit di-reset', 'info');
  });

  // --- 8. FEATURE: QUIZ & GACHA ---
  // Quiz logic simplified
  $('#startQuiz').on('click', function() {
    let currentQ = 0;
    const answers = [];
    
    function showQuestion() {
      if (currentQ >= APP_DATA.quizQs.length) {
        // Finish
        const result = answers.includes('Hitam / Gelap') ? 'Edgy Streetwear' : 'Soft Minimalist';
        $('#quizContainer').html(`
          <div class="text-center py-8">
            <div class="text-4xl mb-2">🎉</div>
            <h3 class="text-xl font-bold mb-2">Hasil: ${result}</h3>
            <p class="text-sm text-gray-600">Berdasarkan jawabanmu, gaya ini paling cocok!</p>
            <button onclick="location.reload()" class="mt-4 text-blue-600 underline">Ulangi</button>
          </div>
        `);
        return;
      }
      
      const q = APP_DATA.quizQs[currentQ];
      let html = `<h4 class="font-bold mb-4 text-lg">${currentQ+1}. ${q.q}</h4><div class="grid grid-cols-1 gap-2">`;
      q.opts.forEach(opt => {
        html += `<button class="quiz-opt text-left p-3 border rounded hover:bg-blue-50 transition-colors">${opt}</button>`;
      });
      html += `</div>`;
      $('#quizContainer').html(html);
      
      $('.quiz-opt').on('click', function() {
        answers.push($(this).text());
        currentQ++;
        showQuestion();
      });
    }
    
    showQuestion();
  });

  // Gacha
  $('#rollGacha').on('click', function() {
    const pool = APP_DATA.gachaPool;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    $('#gachaResult').hide().html(`
      <div class="border-2 border-dashed border-blue-300 p-4 rounded-xl bg-blue-50 text-center">
        <div class="text-3xl mb-2">🎲</div>
        <div class="font-bold text-lg">${pick.name}</div>
        <div class="text-sm text-gray-600">${pick.desc}</div>
        <div class="text-xs mt-2 px-2 py-1 bg-white rounded-full inline-block border">${pick.gender}</div>
      </div>
    `).fadeIn();
  });
  
  // Body Proportion Helper
  $('#calcBody').on('click', function(){
      const h = parseInt($('#height').val());
      const w = parseInt($('#weight').val());
      
      if(!h || !w) { showToast('Isi tinggi & berat badan dulu!', 'error'); return; }
      
      let result = "";
      if(h < 160) result = "Petite: Coba High-waisted pants & Crop top untuk ilusi kaki jenjang.";
      else if(h > 175) result = "Tall: Kamu cocok pakai Maxi Dress atau celana wide-leg yang flowy.";
      else result = "Average Height: Hampir semua gaya cocok! Coba fokus di highlight pinggang.";
      
      $('#bodyResult').text(result).parent().removeClass('hidden');
  });

  // Vibe Generator
  $('.vibe-btn').on('click', function(){
      const vibe = $(this).text();
      const colors = vibe === 'Cute' ? 'Pastel Pink & White' : vibe === 'Cool' ? 'Hitam & Navy' : 'Earth Tones';
      $('#vibeOutput').html(`Vibe <b>${vibe}</b>? Coba mix warna: <span class="text-blue-600 font-bold">${colors}</span>`);
  });

  // --- INITIALIZATION CALLS ---
  renderStyles();
  renderPalettes();
  renderMixItems();
  initChart();
  // Load Default View
  switchSection('home');
  
});
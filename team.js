async function loadTeam() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('team');
  if (!slug) {
    document.body.innerHTML = '<main class="container"><p>Team not specified. <a href="index.html">Go back</a></p></main>';
    return;
  }
  const fallbackLogoPath = './images/' + slug + '.png';

  try {
    const res = await fetch('teams.json');
    const data = await res.json();
    const team = data.teams.find(t => t.slug === slug);
    if (!team) {
      document.body.innerHTML = '<main class="container"><p>Team not found. <a href="index.html">Go back</a></p></main>';
      return;
    }

    console.log('Team data found:', team);
    // Populate DOM
    document.getElementById('team-logo').src = team.logo;
    document.getElementById('team-logo').alt = team.name + ' logo';
    // Logo will display inside the team page's image element; no clickable link required
    document.getElementById('team-name').textContent = team.name;
    document.getElementById('team-league').textContent = team.league;
    document.getElementById('team-description').textContent = team.description;

    const legend = team.legendaryPlayer || {};
    document.getElementById('legend-name').textContent = legend.name || 'N/A';
    document.getElementById('legend-position').textContent = legend.position ? ('Position: ' + legend.position) : '';
    document.getElementById('legend-career').textContent = legend.career ? ('Career: ' + legend.career) : '';
    document.getElementById('legend-bio').textContent = legend.bio || '';

    // Current players
    const playersList = document.getElementById('current-players');
    playersList.innerHTML = '';
    (team.currentPlayers || []).forEach(p => {
      const li = document.createElement('li');
      li.textContent = p;
      playersList.appendChild(li);
    });

    // Update document title
    document.title = team.name + ' - Basketball Hub';
  } catch (err) {
    console.error('Error loading team data:', err);
    // Use fallback logo path if teams.json failed to load
    const img = document.getElementById('team-logo');
    if (img) {
      img.src = fallbackLogoPath;
      img.alt = slug + ' logo (fallback)';
    }
    // No link to set for fallback; show image using fallback path
    // Keep the rest of the page so the user still sees UI even if JSON fails
  }
}

loadTeam();

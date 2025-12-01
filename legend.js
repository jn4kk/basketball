async function loadLegend() {
    const params = new URLSearchParams(window.location.search);
    const legendSlug = params.get('legend');
    
    if (!legendSlug) {
        document.querySelector('.legend-page').innerHTML = '<p>Enginn leikmaður valinn.</p><a href="index.html" class="back-link">← Til baka</a>';
        return;
    }

    try {
        const response = await fetch('legends.json');
        const legends = await response.json();
        const legend = legends.find(l => l.slug === legendSlug);

        if (!legend) {
            document.querySelector('.legend-page').innerHTML = '<p>Leikmaður fannst ekki.</p><a href="index.html" class="back-link">← Til baka</a>';
            return;
        }

        // Update page title
        document.title = `${legend.name} - Basketball Hub`;

        // Update hero section
        document.getElementById('legend-photo').src = legend.photo;
        document.getElementById('legend-photo').alt = legend.name;
        document.getElementById('legend-name').textContent = legend.name;
        document.getElementById('legend-nickname').textContent = `"${legend.nickname}"`;
        document.getElementById('legend-position').textContent = legend.position;

        // Update stats
        document.getElementById('stat-championships').textContent = legend.championships;
        document.getElementById('stat-mvp').textContent = legend.mvpAwards;
        document.getElementById('stat-allstar').textContent = legend.allStarSelections;
        document.getElementById('stat-points').textContent = legend.careerPoints.toLocaleString();

        // Update personal info
        document.getElementById('info-birthdate').textContent = legend.birthDate;
        document.getElementById('info-birthplace').textContent = legend.birthPlace;
        document.getElementById('info-height').textContent = legend.height;

        // Update bio
        document.getElementById('legend-bio').textContent = legend.bio;

        // Update teams
        const teamsList = document.getElementById('legend-teams');
        teamsList.innerHTML = legend.teams.map(team => `<li>🏀 ${team}</li>`).join('');

        // Update achievements
        const achievementsList = document.getElementById('legend-achievements');
        achievementsList.innerHTML = legend.achievements.map(achievement => `<li>🏆 ${achievement}</li>`).join('');

    } catch (error) {
        console.error('Error loading legend:', error);
        document.querySelector('.legend-page').innerHTML = '<p>Villa við að sækja gögn.</p><a href="index.html" class="back-link">← Til baka</a>';
    }
}

document.addEventListener('DOMContentLoaded', loadLegend);

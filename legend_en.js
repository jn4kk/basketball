async function loadLegend() {
    const params = new URLSearchParams(window.location.search);
    const legendSlug = params.get('legend');
    
    if (!legendSlug) {
        document.querySelector('.legend-page').innerHTML = '<p>No player selected.</p><a href="index_en.html" class="back-link">← Back</a>';
        return;
    }

    try {
        const response = await fetch('legends_en.json');
        const legends = await response.json();
        const legend = legends.find(l => l.slug === legendSlug);

        if (!legend) {
            document.querySelector('.legend-page').innerHTML = '<p>Player not found.</p><a href="index_en.html" class="back-link">← Back</a>';
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
        document.querySelector('.legend-page').innerHTML = '<p>Error loading data.</p><a href="index_en.html" class="back-link">← Back</a>';
    }
}

document.addEventListener('DOMContentLoaded', loadLegend);

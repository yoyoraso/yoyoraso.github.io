// Navigation scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
}

// Scroll animations (Intersection Observer)
const animateElements = document.querySelectorAll('.animate-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

animateElements.forEach(el => observer.observe(el));

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// Trigger counters when hero is visible
const heroStats = document.querySelector('.hero__stats');
if (heroStats) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObserver.unobserve(heroStats);
    }
  }, { threshold: 0.5 });
  statsObserver.observe(heroStats);
}

// Terminal typing animation
function initTerminal() {
  const lines = document.querySelectorAll('.terminal__line');
  lines.forEach(line => {
    const delay = parseInt(line.getAttribute('data-delay') || 0);
    const textEl = line.querySelector('.terminal__text');

    setTimeout(() => {
      line.style.animationDelay = '0s';
      line.style.opacity = '1';

      if (textEl) {
        const text = textEl.getAttribute('data-type');
        if (text) {
          let i = 0;
          const typeInterval = setInterval(() => {
            textEl.textContent = text.substring(0, i + 1);
            i++;
            if (i >= text.length) clearInterval(typeInterval);
          }, 40);
        }
      }
    }, delay);
  });
}

// Start terminal when visible
const terminal = document.querySelector('.terminal');
if (terminal) {
  const termObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      initTerminal();
      termObserver.unobserve(terminal);
    }
  }, { threshold: 0.3 });
  termObserver.observe(terminal);
}

// === DevOps Lifecycle ===
(function() {
  const stages = {
    plan: { title: '📋 Plan', desc: 'Defining infrastructure requirements, capacity planning, and translating business needs into scalable technical architecture.', tools: [{n:'Jira',c:''},{n:'Confluence',c:''},{n:'Architecture Diagrams',c:'purple'},{n:'Capacity Planning',c:'green'},{n:'Risk Assessment',c:'orange'}] },
    code: { title: '💻 Code', desc: 'Writing Infrastructure as Code, automation scripts, and custom tooling. Everything version-controlled and peer-reviewed.', tools: [{n:'Terraform',c:'purple'},{n:'Pulumi',c:'purple'},{n:'Go',c:''},{n:'Python',c:''},{n:'Bash',c:''},{n:'Git',c:'orange'}] },
    build: { title: '🔨 Build', desc: 'Automated pipelines that compile, package, and containerize applications. Every commit produces immutable artifacts.', tools: [{n:'GitLab CI',c:'orange'},{n:'GitHub Actions',c:''},{n:'Docker',c:''},{n:'Kaniko',c:''},{n:'Helm Charts',c:'purple'},{n:'OCI Images',c:'green'}] },
    test: { title: '🧪 Test', desc: 'Automated testing — security scanning, infrastructure validation, and policy checks before anything reaches production.', tools: [{n:'Trivy',c:'green'},{n:'OPA/Rego',c:'green'},{n:'Terratest',c:'purple'},{n:'SonarQube',c:''},{n:'SAST/DAST',c:'orange'},{n:'Policy as Code',c:''}] },
    release: { title: '🚀 Release', desc: 'GitOps-driven releases with automated promotion. Canary deployments, feature flags, and rollback strategies.', tools: [{n:'ArgoCD',c:'orange'},{n:'FluxCD',c:''},{n:'Helm',c:''},{n:'Kustomize',c:'purple'},{n:'Semantic Versioning',c:'green'},{n:'GitOps',c:''}] },
    deploy: { title: '☁️ Deploy', desc: 'Production deployments to Kubernetes clusters across AWS and GCP. Zero-downtime rolling updates and blue-green deployments.', tools: [{n:'AWS EKS',c:'orange'},{n:'GCP GKE',c:''},{n:'Kubernetes',c:''},{n:'Terraform',c:'purple'},{n:'Cert-Manager',c:'green'},{n:'Ingress/ALB',c:''}] },
    operate: { title: '⚙️ Operate', desc: 'Day-2 operations — secrets management, auto-scaling, backup strategies, disaster recovery, and high availability.', tools: [{n:'Vault',c:'purple'},{n:'Keycloak',c:''},{n:'AWS Secrets Manager',c:'orange'},{n:'HPA/VPA',c:''},{n:'Velero',c:'green'},{n:'Ansible',c:''}] },
    monitor: { title: '📊 Monitor', desc: 'Full-stack observability with metrics, logs, and traces. Custom dashboards, intelligent alerting, and SLO-driven reliability.', tools: [{n:'Prometheus',c:'orange'},{n:'Grafana',c:'orange'},{n:'Loki',c:''},{n:'OpenTelemetry',c:''},{n:'OpenSearch',c:'green'},{n:'PagerDuty',c:'purple'}] }
  };

  const detail = document.getElementById('lc-detail');
  const title = document.getElementById('lc-title');
  const desc = document.getElementById('lc-desc');
  const tools = document.getElementById('lc-tools');
  if (!detail) return;

  document.querySelectorAll('.lc-stage').forEach(btn => {
    btn.addEventListener('click', () => {
      const data = stages[btn.dataset.stage];
      if (!data) return;
      document.querySelectorAll('.lc-stage').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      title.textContent = data.title;
      desc.textContent = data.desc;
      tools.innerHTML = data.tools.map(t => `<span class="lc-tag${t.c ? ' lc-tag--'+t.c : ''}">${t.n}</span>`).join('');
      detail.classList.add('visible');
    });
  });

  // Auto-select first stage when visible
  const lcSection = document.getElementById('lifecycle');
  if (lcSection) {
    const lcObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => document.querySelector('[data-stage="plan"]')?.click(), 400);
        lcObs.unobserve(lcSection);
      }
    }, { threshold: 0.3 });
    lcObs.observe(lcSection);
  }
})();

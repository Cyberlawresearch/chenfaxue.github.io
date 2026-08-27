/**
 * Academic Scholar Portfolio - Main Interactive Logic
 * Restrained, Authentic Legal Scholar Academic Website
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPublicationFilter();
  initCitationCopy();
  initAbstractModal();
  initScrollAnimations();
  initStatsCounter();
  initContactForm();
  lucide.createIcons();
});

/* --------------------------------------------------------------------------
   1. Navbar, Active Scroll Spy, Mobile Drawer
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('shadow-sm');
    } else {
      navbar.classList.remove('shadow-sm');
    }
    highlightActiveSection();
  });

  // Mobile Menu Toggle
  function toggleMobileMenu(open) {
    if (open) {
      mobileMenuDrawer.classList.remove('translate-x-full');
      mobileBackdrop.classList.remove('hidden');
      setTimeout(() => mobileBackdrop.classList.remove('opacity-0'), 10);
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenuDrawer.classList.add('translate-x-full');
      mobileBackdrop.classList.add('opacity-0');
      setTimeout(() => mobileBackdrop.classList.add('hidden'), 200);
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
  }
  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', () => toggleMobileMenu(false));
  }
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', () => toggleMobileMenu(false));
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // Active Section Spy
  const sections = document.querySelectorAll('section[id], footer[id]');
  function highlightActiveSection() {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-slate-900', 'font-medium');
            link.classList.remove('text-slate-600');
          } else {
            link.classList.remove('text-slate-900', 'font-medium');
            link.classList.add('text-slate-600');
          }
        });
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. Publication Filter Engine
   -------------------------------------------------------------------------- */
function initPublicationFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const paperCards = document.querySelectorAll('.pub-card');
  const countBadge = document.getElementById('pub-visible-count');

  filterTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      filterTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      let visibleCount = 0;

      paperCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (countBadge) {
        countBadge.innerText = `显示 ${visibleCount} 篇代表性论著`;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. BibTeX Citation Copier & Toast
   -------------------------------------------------------------------------- */
function initCitationCopy() {
  const bibtexBtns = document.querySelectorAll('.copy-bibtex-btn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  bibtexBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const bibtex = btn.getAttribute('data-bibtex');
      if (bibtex) {
        navigator.clipboard.writeText(bibtex).then(() => {
          showToast('✓ BibTeX 引用已复制到剪贴板');
        }).catch(() => {
          showToast('复制失败，请手动选取');
        });
      }
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast) return;

  toastMsg.innerText = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

/* --------------------------------------------------------------------------
   4. Abstract Details Modal
   -------------------------------------------------------------------------- */
const paperDetailsData = {
  "p1": {
    title: "生成式人工智能的知识产权侵权认定与责任边界重构",
    journal: "《中国法学》2024年第3期 (CSSCI / CLSCI 权威期刊)",
    doi: "10.14111/j.cnki.zgfx.2024.03.008",
    abstract: "生成式人工智能（AIGC）的发展对传统著作权侵权判定规则提出了新问题。本文立足训练数据摄入、表征学习到内容生成全流程，分析传统‘接触+实质性相似’规则在概率生成环境下的适用难点，提出构建‘输入层合理使用+输出层实质溯源’的规则协调路径，平衡技术创新与权利保护。",
    keywords: "生成式AI；著作权侵权；合理使用；算法透明度；数据要素",
    bibtex: `@article{chen2024generative,
  title={生成式人工智能的知识产权侵权认定与责任边界重构},
  author={陈法学},
  journal={中国法学},
  number={3},
  pages={45--68},
  year={2024},
  doi={10.14111/j.cnki.zgfx.2024.03.008}
}`
  },
  "p2": {
    title: "Algorithmic Governance and the Rule of Law: Reconceptualizing Due Process in AI-Driven Decisions",
    journal: "Harvard Journal of Law & Technology, Vol. 37, No. 2, pp. 312-354 (2023)",
    doi: "10.2139/ssrn.4291882",
    abstract: "As automated decision-making systems permeate administrative enforcement and judicial support, traditional due process faces epistemic and institutional challenges. This article advances an 'algorithmic due process' framework encompassing counterfactual explanations, system auditability, and human-in-the-loop oversight mandates.",
    keywords: "Algorithmic Governance; Due Process; Explainable AI; Administrative Law",
    bibtex: `@article{chen2023algorithmic,
  title={Algorithmic Governance and the Rule of Law: Reconceptualizing Due Process in AI-Driven Decisions},
  author={Chen, Faxue},
  journal={Harvard Journal of Law & Technology},
  volume={37},
  number={2},
  pages={312--354},
  year={2023}
}`
  },
  "p3": {
    title: "数据产权结构的‘三权分置’法理逻辑与制度供给",
    journal: "《法学研究》2023年第2期 (CSSCI / CLSCI 权威期刊)",
    doi: "10.13415/j.cnki.fxzy.2023.02.004",
    abstract: "构建符合数据要素非排他性、衍生性特征的基础制度是促进数据要素高效流通的关键。本文深入剖析数据资源持有权、数据加工使用权与数据产品经营权的权利结构，探讨淡化所有权、强化用益权的制度安排，为数据基础制度建设提供法理参考。",
    keywords: "数据要素；三权分置；用益物权；数据流通；数据资产",
    bibtex: `@article{chen2023data,
  title={数据产权结构的‘三权分置’法理逻辑与制度供给},
  author={陈法学},
  journal={法学研究},
  number={2},
  pages={82--101},
  year={2023}
}`
  }
};

function initAbstractModal() {
  const modal = document.getElementById('abstract-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const viewBtns = document.querySelectorAll('.view-abstract-btn');

  if (!modal) return;

  function openModal(paperId) {
    const data = paperDetailsData[paperId] || {
      title: "论文摘要",
      journal: "学术核心期刊",
      doi: "N/A",
      abstract: "该论文探讨了数字时代法治演进的相关命题，深入结合技术机理与制度构建，为相关立法与实务提供了法理参考。",
      keywords: "数字法学；前沿法治",
      bibtex: ""
    };

    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-journal').innerText = data.journal;
    document.getElementById('modal-doi').innerText = data.doi;
    document.getElementById('modal-abstract').innerText = data.abstract;
    document.getElementById('modal-keywords').innerText = data.keywords;
    
    const copyBibBtn = document.getElementById('modal-copy-bib');
    if (copyBibBtn) {
      copyBibBtn.setAttribute('data-bibtex', data.bibtex);
    }

    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modal.querySelector('.modal-content').classList.remove('scale-95');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('opacity-0');
    modal.querySelector('.modal-content').classList.add('scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 200);
  }

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-paper-id');
      openModal(pid);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
}

/* --------------------------------------------------------------------------
   5. Dynamic Stats Counter
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetVal = parseInt(target.getAttribute('data-target'), 10) || 0;
        let current = 0;
        const increment = Math.max(1, Math.floor(targetVal / 25));
        const timer = setInterval(() => {
          current += increment;
          if (current >= targetVal) {
            target.innerText = targetVal + (target.getAttribute('data-suffix') || '');
            clearInterval(timer);
          } else {
            target.innerText = current;
          }
        }, 30);
        obs.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(num => observer.observe(num));
}

/* --------------------------------------------------------------------------
   6. Scroll Reveal Observer
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-init');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   7. Contact Form Interaction
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `正在发送...`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = `✓ 留言已发送`;
      form.reset();
      showToast('✓ 留言已发送，学者或研究助理将尽快处理');

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        lucide.createIcons();
      }, 3000);
    }, 800);
  });
}

<template>
  <footer class="footer mt-auto py-4 border-top">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6 mb-2 mb-md-0">
          <a href="/" class="d-inline-flex align-items-center text-decoration-none mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-primary me-2" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0z"/>
            </svg>
            <span class="fw-semibold text-dark">CATAN</span>
          </a>
          <p class="text-muted small mb-0">
            Created by student of NITS.<br>
          </p>
        </div>

        <div class="col-md-6">
          <ul class="list-unstyled d-flex flex-wrap justify-content-md-end gap-3 mb-0">
            <li><a href="/" class="text-muted text-decoration-none small footer-link">カタンについて</a></li>
            <li><a href="/about" class="text-muted text-decoration-none small footer-link">カタンルール紹介</a></li>
            
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top-color: var(--bs-border-color) !important;
}

.footer-link {
  transition: color 0.15s ease-in-out;
}

.footer-link:hover {
  color: var(--bs-primary) !important;
}
</style>
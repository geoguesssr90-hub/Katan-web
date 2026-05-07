<template>
  <footer class="footer mt-auto py-4 border-top">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6 mb-2 mb-md-0">
          <NuxtLink to="/" class="d-inline-flex align-items-center text-decoration-none mb-2">
            <span class="fw-semibold text-dark">CATAN</span>
          </NuxtLink>
          <p class="text-muted small mb-0">
            Created by a student of NITS.<br>
          </p>
        </div>

        <div class="col-md-6">
          <ul class="list-unstyled d-flex flex-wrap justify-content-md-end gap-3 mb-0">
            <li><NuxtLink to="/" class="text-muted text-decoration-none small footer-link">カタンについて</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-muted text-decoration-none small footer-link">カタンルール紹介</NuxtLink></li>
            
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
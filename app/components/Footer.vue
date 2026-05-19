<template>
  <footer class="footer mt-auto py-4 border-top">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6 mb-2 mb-md-0">
          <NuxtLink to="/" class="d-inline-flex align-items-center text-decoration-none mb-2">
            <span class="fw-semibold text-dark">CATAN</span>
          </NuxtLink>
          <p class="text-muted small mb-0">
            Created by a student of NITS.
          </p>
        </div>

        <div class="col-md-6">
          <ul class="list-unstyled d-flex flex-wrap justify-content-md-end gap-3 mb-0">
            <li v-for="topic in topics" :key="topic.to">
              <NuxtLink :to="topic.to" class="text-muted text-decoration-none small footer-link">
                {{ topic.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- コピーライトを追加 -->
      <div class="row mt-3">
        <div class="col text-center">
          <p class="text-muted small mb-0">© 2026 カタン非公式団体</p>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>

const topics=[
  {label:'カタンルール紹介', to:'/'},
  {label:'カタンルール詳細', to:'/about'},
  {label:'プライバシーポリシー', to:'/privacy'}
]

</script>

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
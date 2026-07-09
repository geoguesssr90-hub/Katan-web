<template>
  <BNavbar
    v-b-color-mode="'dark'"
    :toggleable="true"
    variant="primary"
  >
    <BNavbarBrand to="/" id="strong"><strong>CATAN</strong></BNavbarBrand>
    <BNavbarToggle target="nav-offcanvas" />
    <BOffcanvas
      id="nav-offcanvas"
      title="カタン公式ルール（非公式団体）"
      placement="end"
      is-nav
    >
      <BNavbarNav>
        <!menu topicks>
        <BNavItem 
        v-for="link in navLinks"
        :key="link.path"
        @click.prevent="navigate(link.path)">
      {{ link.label }}
      </BNavItem>
      </BNavbarNav>
    </BOffcanvas>
  </BNavbar>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigate = (path) => {
  document.querySelector('#nav-offcanvas .btn-close')?.click()
  setTimeout(() => router.push(path), 300)
}

const navLinks=[
  {label: 'カタンについて', path: '/'},
  {label: 'カタンルール詳細', path: '/about'},
  {label: '盤面で遊んでみる', path: '/play'},
  {label: 'プライバシーポリシー', path: '/privacy'}
]

</script>

<style scoped>
@media (min-width: 768px) {
  #strong { font-size: 30px !important; }
}
@media (max-width: 767px) {
  #strong { font-size: 30px !important; }
}
</style>
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
        <BNavItem @click.prevent="navigate('/')">カタンについて</BNavItem>
        <BNavItem @click.prevent="navigate('/about')">カタンルール紹介</BNavItem>
      </BNavbarNav>
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavItemDropdown text="言語" right>
          <BDropdownItem>日本語</BDropdownItem>
          <BDropdownItem>English</BDropdownItem>
        </BNavItemDropdown>
        <BNavItemDropdown right>
          <template #button-content>
            <em>UserId</em>
          </template>
          <BDropdownItem>email</BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
      <BNavForm class="d-flex">
        <BFormInput class="me-2" placeholder="Search" />
        <BButton type="submit" variant="outline-success">Search</BButton>
      </BNavForm>
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
</script>

<style scoped>
@media (min-width: 768px) {
  #strong { font-size: 30px !important; }
}
@media (max-width: 767px) {
  #strong { font-size: 30px !important; }
}
</style>
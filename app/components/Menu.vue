<template>
  <!-- #region template -->
  <BNavbar
    v-b-color-mode="'dark'"
    :toggleable="true"
    variant="primary"
  >
    <BNavbarBrand href="/" id="strong"><strong>CATAN</strong></BNavbarBrand>
    <BNavbarToggle target="nav-offcanvas" />
    <BOffcanvas
      id="nav-offcanvas"
      title="カタン公式ルール（非公式団体）"
      placement="end"
      is-nav
    >
      <BNavbarNav>
        <BNavItem href="/">カタンについて</BNavItem>
        <BNavItem href="/about">カタンルール紹介</BNavItem>
      </BNavbarNav>
      <!-- Right aligned nav items -->
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavItemDropdown
          text="言語"
          right
        >
          <BDropdownItem>日本語</BDropdownItem>
          <BDropdownItem>English</BDropdownItem>
        </BNavItemDropdown>
        <BNavItemDropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>UserId</em>
          </template>
          <BDropdownItem>email</BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
      <BNavForm class="d-flex">
        <BFormInput
          class="me-2"
          placeholder="Search"
        />
        <BButton
          type="submit"
          variant="outline-success"
          >Search</BButton
        >
      </BNavForm>
    </BOffcanvas>
  </BNavbar>
  <!-- #endregion template -->
</template>

<style scoped>
@media(min-width:768px){
  #house{
    font-size:50px !important;
  }
}

@media(max-width:767px){
  #strong{
    font-size:30px;
  }
}


</style>
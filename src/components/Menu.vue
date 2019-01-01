<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
    >
      <div class="navbar-start">

      </div>
    </div>

    <div class="navbar-end">
      <a class="navbar-item">
        Dashboard
      </a>

      <a class="navbar-item">
        Users
      </a>

      <a class="navbar-item">
        Settings
      </a>

      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
nav {
  margin-bottom: 50px;
}
</style>

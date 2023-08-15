resource "random_string" "password" {
  length  = 32
  special = false
  upper   = true
}

resource "random_string" "username" {
  length  = 32
  special = false
  upper   = true
}

output "db_password" {
  value = random_string.password.result
}

output "db_username" {
  value = random_string.username.result
}

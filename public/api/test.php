<?php
  $username = "admin";
  $password = "";
  $hostname = "localhost";

  $db = new mysqli($hostname, $username, $password, "radops_test");

  if ($db->connect_errno) {
    printf("Connect failed: %s\n", $db->connect_error);
    exit();
  }



?>

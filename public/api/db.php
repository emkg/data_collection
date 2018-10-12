<?php
  $username = "radops";
  $password = "tSYsfuJuMmWWRU6W";
  $hostname = "localhost";

  $db = new mysqli($hostname, $username, $password, "radops");
  if ($db->connect_errno) {
    printf("Connect failed: %s\n", $db->connect_error);
    exit();
  }
?>

<?php
  //$username = "tester";
  //$password = "tester";
  $username = "radops";
  $password = "tSYsfuJuMmWWRU6W";
  $hostname = "localhost";

  //$db = new mysqli($hostname, $username, $password, "RadOps");
  $db = new mysqli($hostname, $username, $password, "radops");
  if ($db->connect_errno) {
    printf("Connect failed: %s\n", $db->connect_error);
    exit();
  }

  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

  if ($contentType === "application/json") {
      //Receive the RAW post data.
      $content = trim(file_get_contents("php://input"));
      $decoded = json_decode($content, true);

      //$data = json_decode(file_get_contents('php://input'), true);
      // create an insert to update this change -- it is approved so it must become an alert now
      $sql  = "INSERT INTO `EVENT`(`instrument`, `eventType`, `event_id`, `eventDescription`, `eventStart`, `eventEnd`)";
      $sql .= "VALUES('" . $decoded['instrument'] . "', NULL, '1', '" . $decoded['eventDescription'] . "', NULL, NULL)";
      //. "','" . $data['time'] . "','" . $data['ticketID'] . "','";
      //$sql .= $data['software'] . "','" . $data['user'] . "','" . $data['email'] . "')";
      echo $sql;
      // insert updated data to the change, send the lab-wide email, and redirect back home
      if ($db->query($sql)) {
      		echo "\nSUCCESS!";
      } else {
          echo "Error: " . $sql . "<br>" . mysqli_error($db);
      }

      $db->close();
  }
?>

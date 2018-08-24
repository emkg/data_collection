<?php
  require("db.php");

  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

  if ($contentType === "application/json") {
      //Receive the RAW post data.
      $content = trim(file_get_contents("php://input"));
      $decoded = json_decode($content, true);

      // when we have an event we need to also add each radar sig
      $sql  = "INSERT INTO `EVENT`(`instrument`, `eventType`, `event_id`, `eventDescription`, `eventStart`, `eventEnd`)";
      $sql .= "VALUES('" . $decoded['instrument'] . "', '" . $decoded['eventType'] . "', '";
      $sql .= $decoded['eventID'] . "', '"  . $decoded['eventDescription'] . "', '";
      $sql .= $decoded['eventStart'] . "', '" . $decoded['eventEnd'] . "')";
      $sql .= "INSERT INTO `RADAR_SIGNATURE`(`event_id`, `radar_sig_value`)";
      $sql .= "VALUES('" . $decoded['eventID'] . "', '" . $decoded['eventRadarSigs']. "')";

      echo $sql;

      // send data to db
      if ($db->query($sql)) {
      		echo "\nSUCCESS!";
      } else {
          echo "Error: " . $sql . "<br>" . mysqli_error($db);
      }

      $db->close();
  }
?>

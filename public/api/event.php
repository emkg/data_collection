<?php
  require("db.php");

  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

  if ($contentType === "application/json") {
      //Receive the RAW post data.
      $content = trim(file_get_contents("php://input"));
      $decoded = json_decode($content, true);

      $sql  = "INSERT INTO `event` (`eventStart`, `eventEnd`, `instrument`, `collector`, `collectorContact`, `eventType`, `radarSigs`, `eventDescr`, `eventID`) ";
      $sql .= "VALUES ('";
      $sql .= $decoded['eventStart'];
      $sql .= "', '";
      $sql .= $decoded['eventEnd'];
      $sql .= "', '";
      $sql .= $decoded['instrument'];
      $sql .= "', '";
      $sql .= $decoded['collector'];
      $sql .= "', '";
      $sql .= $decoded['collectorEmail'];
      $sql .= "', '";
      $sql .= $decoded['eventType'];
      $sql .= "', '";
      $sql .= $decoded['eventRadarSigs'];
      $sql .= "', '";
      $sql .= $decoded['eventDescription'];
      $sql .= "', '";
      $sql .= $decoded['eventID'];
      $sql .= "');";


      echo $sql;


      // send data to db
      if ($db->query($sql)) {
      		echo "\nSUCCESS!";
      } else {
          echo "Error: " . $sql . "\n" . mysqli_error($db);
      }

      $db->close();
  }
?>

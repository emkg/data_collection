<?php
  require("db.php");
  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

  if ($contentType === "application/json") {
      //Receive the RAW post data.
      $content = trim(file_get_contents("php://input"));
      $decoded = json_decode($content, true);


      $sql  = "INSERT INTO `REPORT`(`collectionID`, `startTime`, `reportText`) ";
      $sql .= "VALUES('" . $decoded['collectionID'];
      $sql .= "', '" . $decoded['startTime'] . "', '" . $decoded['reportText'] . "')";

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

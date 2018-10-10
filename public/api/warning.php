<?php
  require("db.php");
  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';


// TODO: add counties!!npm start
  if ($contentType === "application/json") {
      //Receive the RAW post data.
      $content = trim(file_get_contents("php://input"));
      $decoded = json_decode($content, true);

      $sql  = "INSERT INTO `warning`(`startTime`, `endTime`, `warningType`, `warningCounties`, `warningText`, `eventId`, `dailycollectionnumber`) ";
      $sql .= "VALUES('";
      $sql .= $decoded['collectionStart'];
      $sql .= "', '";
      $sql .= $decoded['collectionEnd'];
      $sql .=  "', '";
      $sql .= $decoded['warningType'];
      $sql .= "', '";
      $sql .= $decoded['warningCounties'];
      $sql .=  "', '";
      $sql .= $decoded['warningText'];
      $sql .=  "', '";
      $sql .= $decoded['eventID'];
      $sql .=  "', '";
      $sql .= $decoded['dailyCollectionNumber'];
      $sql .= "')";

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

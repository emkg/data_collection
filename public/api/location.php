<?php
  require("db.php");

  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

  if ($contentType === "application/json") {
      //Receive the RAW post data.
      $content = trim(file_get_contents("php://input"));
      $decoded = json_decode($content, true);

      // when we have an event we need to also add each radar sig
      $sql  = "INSERT INTO `location`(`startTime`, `lat`, `long`, `eventId`, `dailycollectionnumber`)";
      $sql .= "VALUES('";
      $sql .= $decoded['collectionStart'];
      $sql .= "', '" ;
      $sql .= $decoded['locationLat'];
      $sql .= "', '";
      $sql .= $decoded['locationLong'];
      $sql .= "', '";
      $sql .= $decoded['eventID'];
      $sql .= "', '";
      $sql .= $decoded['dailyCollectionNumber'];
      $sql .="');";

      // send data to db
      if ($db->query($sql)) {
      		echo "\nSUCCESS!";
      } else {
          echo "Error: " . $sql . "\n" . mysqli_error($db);
      }

      $db->close();
  }
?>

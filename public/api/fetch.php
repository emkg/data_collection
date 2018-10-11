<?php
  require("db.php");

  $sql = "SELECT * from `event`";

  // Getting the received JSON into $json variable.
  //$json = file_get_contents('php://input');

  // decoding the received JSON and store into $obj variable.
  //$obj = json_decode($json,true);

  // Populate ID from JSON $obj array and store into $ID.
  //$ID = $obj['id'];

  //Fetching the selected record.
  //$CheckSQL = "SELECT * FROM Student_Info_Table WHERE id='$ID'";

  $result = $db->query($sql);
  if ($result->num_rows >0) {
      while($row[] = $result->fetch_assoc()) {
      $item = $row;
      $json = json_encode($Item);
    }

  } else {

    echo "Result is empty set.";
    echo "else possible error: " . mysqli_error($db);
  }

  echo $json;

  $db->close();
?>

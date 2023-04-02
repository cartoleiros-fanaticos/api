<script>
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJXLUppTjhfZXdyWE9uVnJFN2lfOGpIY28yU1R4dEtHZF94aW01R2N4WS1ZIn0.eyJleHAiOjE2ODIxNzIyODQsImlhdCI6MTY3OTU4MDI4NCwiYXV0aF90aW1lIjoxNjc5NTgwMjg0LCJqdGkiOiI3NmJiZTYzZS00Zjk4LTQ3YzUtODk0NS01MTRiZDkzNmZiOWQiLCJpc3MiOiJodHRwczovL2lkLmdsb2JvLmNvbS9hdXRoL3JlYWxtcy9nbG9iby5jb20iLCJzdWIiOiJmOjNjZGVhMWZiLTAwMmYtNDg5ZS1iOWMyLWQ1N2FiYTBhZTQ5NDo5NjhhMDQ3MS1kYzMzLTRjMTgtYjVmNS0yZTVlY2M0YTcxNjIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjYXJ0b2xhQGFwcHMuZ2xvYm9pZCIsInNlc3Npb25fc3RhdGUiOiIwYTVmM2NlYi05NGZiLTRiZDEtYmY1Zi0zMTYzN2EzOGRjZGUiLCJhY3IiOiIxIiwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSBnbG9ib2lkIiwic2lkIjoiMGE1ZjNjZWItOTRmYi00YmQxLWJmNWYtMzE2MzdhMzhkY2RlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJKb3NlIFdlZHNvbiBkb3MgU2FudG9zIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiam9zZV93ZWRzb25fY3Jvc3MiLCJlbWFpbCI6IndlZHNvbl9jcm9zc0Bob3RtYWlsLmNvbSIsImdsb2JvX2lkIjoiOTY4YTA0NzEtZGMzMy00YzE4LWI1ZjUtMmU1ZWNjNGE3MTYyIn0.F-mUx8aan4Ey9DKzYZJn7VLJpauJ9HjFIR_WeShVvSQDJS8izCQZLKc5GKRy-iVbslN4BWc2cgTyCtX57lCP07Es-2WvpVGJR7jzmyKaRVYdcBpaAtMNQPDKPUi704ORM48dSjVQH5PQgBqxXAkSEUqQ_R7HUiVNo8zgnxvYy-04MAxd4nybriy8AtoaFrbnvKBKcYHrRqC-7Es0sBDkADAeqcjQv6vf7wuQB7nvHNVHzGFmH2cj3d8a49edD5vDZ_yLctuS_gapRDuM5wjOQKcE-ALkThsvntRptYgSdPSW6TC4HZA0-1zPw0EdmRGQfkxRSO0rZHghifiSwtBf2w';

    const myHeaders = new Headers();

    const myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default' 
    };

    fetch('flowers.jpg',myInit)
    .then(function(response) {
  return response.blob();
})
    .then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
});
</script>
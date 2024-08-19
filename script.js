document.getElementById('scheduleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let day = document.getElementById('day').value;
    let time = document.getElementById('time').value;
    let room = document.getElementById('room').value;
    let teacher = document.getElementById('teacher').value;
    let comment = document.getElementById('comment').value;

    let table = document.getElementById('scheduleTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    let nameCell = newRow.insertCell(0);
    let dayCell = newRow.insertCell(1);
    let timeCell = newRow.insertCell(2);
    let roomCell = newRow.insertCell(3);
    let teacherCell = newRow.insertCell(4);
    let commentCell = newRow.insertCell(5);

    nameCell.textContent = name;
    dayCell.textContent = day;
    timeCell.textContent = time;
    roomCell.textContent = room;
    teacherCell.textContent = teacher;
    commentCell.textContent = comment;

    document.getElementById('scheduleForm').reset();
});

document.getElementById('saveBtn').addEventListener('click', function() {
    let table = document.getElementById('scheduleTable');
    let rows = table.getElementsByTagName('tr');
    let data = [];

    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        let row = [];
        for (let j = 0; j < cells.length; j++) {
            row.push(cells[j].textContent);
        }
        data.push(row.join(", "));
    }

    let blob = new Blob([data.join("\n")], { type: "text/plain;charset=utf-8" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "schedule.txt";
    link.click();
});

document.getElementById('shareBtn').addEventListener('click', function() {
    let table = document.getElementById('scheduleTable');
    let rows = table.getElementsByTagName('tr');
    let message = [];

    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        let row = [];
        for (let j = 0; j < cells.length; j++) {
            row.push(cells[j].textContent);
        }
        message.push(row.join(", "));
    }

    let whatsappMessage = "Logística de Horários e Salas de Aula:\n\n" + message.join("\n");

    let whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
});

document.getElementById('teacherScheduleBtn').addEventListener('click', function() {
    let teacherScheduleDiv = document.getElementById('teacherSchedule');
    if (teacherScheduleDiv.style.display === "none") {
        teacherScheduleDiv.style.display = "block";
    } else {
        teacherScheduleDiv.style.display = "none";
    }
});

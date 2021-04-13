const options = {
    transports: ['websocket'],
  };

  const socket = io('localhost:3000/', options);

  const formEl = document.getElementById('questions-form');
  formEl.addEventListener('submit', handleSubmit);



socket.on('connect', () => {
    console.log('user connected');
    socket.emit('getall');

    socket.on('onlineStaff', (payload) => {
      renderAside(payload.name, payload.id);
    });

  });

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      studentName: e.target.name.value,
    };
    socket.emit('join', { room: 'lopy' , name: payload.studentName});
  }
 
  function renderAside(name, id) {
    const container = document.getElementById('teamMember');
    const h2El = document.createElement('h2');
    h2El.textContent = name;
    h2El.id = id;
    container.append(h2El);
  }
  
  
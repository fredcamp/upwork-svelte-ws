<script>
  let counter;

  const incrementCounter = async () => {
    try {
      const response = await fetch('/increment', { method: 'POST' });
      if (response.ok) {
        const newCounterValue = await response.text();
        counter = parseInt(newCounterValue);
      } else {
        console.error('Failed to increment the counter.');
      }
    } catch (error) {
      console.error('An error occurred while incrementing the counter:', error);
    }
  };

  const socket = new WebSocket('ws://localhost:3000');

  socket.addEventListener('message', (event) => {
    counter = parseInt(event.data);
  });
</script>

<div>
  <p>Counter: {counter}</p>
  <button on:click={incrementCounter}>Increment</button>
</div>

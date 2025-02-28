export default function decorate(block) {
  console.log('decorate myblock');
  console.log(block);
  block.textContent = 'Hello from myblock';
}

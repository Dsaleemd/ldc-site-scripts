<!-- Floating Button & Tray -->
<div id="hover-widget" style="position: fixed; bottom: 24px; right: 24px; z-index: 9999; font-family: sans-serif;">
  <div style="display: flex; flex-direction: column; align-items: flex-end;">
    <button id="widget-button" style="
      background-color: #0fbcb0;
      color: white;
      border-radius: 5px;
      padding: 16px 24px;
      font-size: 16px;
      font-weight: bold;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border: none;
      cursor: pointer;
      transition: background-color 0.3s;
    ">
      How can I help?
    </button>

    <div id="widget-options" style="
      margin-top: 16px;
      width: 300px;
      background: linear-gradient(135deg, #d1f4f2, #a8e8e4);
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.5s ease;
      display: flex;
      flex-direction: column;
      padding: 0 24px;
      color: #000;
    ">
      <div style="padding-top: 24px;">
        <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 12px;">Hello, how can I help? <span>👋</span></h2>

        <div style="background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
          <p style="font-size: 14px; margin-bottom: 12px;">Please reach out to our team for any dental-related questions...</p>
          <button id="contact-us-button" style="
            background-color: #0fbcb0;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 10px;
            width: 100%;
            font-weight: bold;
            cursor: pointer;
          ">Contact us</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
          <a href="https://onlineappointment.carestack.uk/?dn=londondentalcentre" target="_blank" rel="noopener noreferrer" style="
            background-color: #0fbcb0;
            color: white;
            text-align: center;
            padding: 10px;
            border-radius: 8px;
            font-weight: bold;
            text-decoration: none;
          ">Book Online</a>

          <a href="https://wa.me/447817295919" target="_blank" rel="noopener noreferrer" style="
            background-color: #0fbcb0;
            color: white;
            text-align: center;
            padding: 10px;
            border-radius: 8px;
            font-weight: bold;
            text-decoration: none;
          ">WhatsApp</a>

          <a href="tel:+442036677070" style="
            background-color: #0fbcb0;
            color: white;
            text-align: center;
            padding: 10px;
            border-radius: 8px;
            font-weight: bold;
            text-decoration: none;
          ">Call Us</a>
        </div>

        <div style="background: white; border-radius: 12px; padding: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
          <h3 style="font-weight: bold; margin-bottom: 12px; font-size: 16px;">🔗 Recommended Pages</h3>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 14px;">
            <a href="/treatment/invisalign" style="color: #000; text-decoration: none;">Invisalign</a>
            <a href="/cosmetic-bonding" style="color: #000; text-decoration: none;">Composite Bonding</a>
            <a href="/treatment/teeth-whitening" style="color: #000; text-decoration: none;">Teeth Whitening</a>
            <a href="/treatment/implants" style="color: #000; text-decoration: none;">Implants</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Widget Behaviour Script -->
<script>
  const widgetButton = document.getElementById('widget-button');
  const widgetOptions = document.getElementById('widget-options');
  const contactUsButton = document.getElementById('contact-us-button');

  let open = false;

  widgetButton.addEventListener('click', () => {
    open = !open;
    if (open) {
      widgetOptions.style.maxHeight = '1000px';
      widgetButton.textContent = 'X';
    } else {
      widgetOptions.style.maxHeight = '0';
      widgetButton.textContent = 'How can I help?';
    }
  });

  contactUsButton.addEventListener('click', () => {
    window.open('https://forms.fillout.com/t/tRU6vbdu1Vus', '_blank', 'width=600,height=700');
  });
</script>


<!-- Contact Us Modal -->
<div id="form-modal" style="
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  justify-content: center;
  align-items: center;
  overflow: auto;
">
  <div style="
    background: #fff;
    border-radius: 12px;
    max-width: 800px;
    width: 95%;
    margin: 5vh auto;
    position: relative;
    padding: 1.5rem;
    box-sizing: border-box;
  ">
    <span id="close-form" style="
      position: absolute;
      top: 1rem;
      right: 1rem;
      cursor: pointer;
      font-size: 1.5rem;
    ">&times;</span>
    <div id="form-container" style="
      width: 100%;
      height: 80vh;
      overflow: auto;
    "></div>
  </div>
</div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.open-form-button');
    const modal = document.getElementById('form-modal');
    const closeBtn = document.getElementById('close-form');
    const formContainer = document.getElementById('form-container');
    let formLoaded = false;

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        modal.style.display = 'flex';

        if (!formLoaded) {
          const formDiv = document.createElement('div');
          formDiv.setAttribute('data-fillout-id', 'tRU6vbdu1Vus');
          formDiv.setAttribute('data-fillout-embed-type', 'standard');
          formDiv.setAttribute('data-fillout-inherit-parameters', '');
          formDiv.setAttribute('data-fillout-dynamic-resize', '');
          formDiv.style.width = '100%';
          formDiv.style.minHeight = '500px';

          formContainer.appendChild(formDiv);

          const script = document.createElement('script');
          script.src = 'https://server.fillout.com/embed/v1/';
          document.body.appendChild(script);

          formLoaded = true;
        }
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
</script>

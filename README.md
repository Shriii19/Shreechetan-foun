# ShreeChetan Janseva Foundation Website

A modern, responsive website for the ShreeChetan Janseva Foundation built with HTML, CSS, and vanilla JavaScript.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: Semantic HTML, ARIA attributes, keyboard navigation support
- **Interactive Components**: 
  - Mobile navigation with hamburger menu
  - Smooth scrolling
  - Animated counters with Intersection Observer
  - Testimonials carousel
  - Gallery lightbox
  - Donation modal with form validation
  - Volunteer registration form
- **Modern Styling**: CSS Grid, Flexbox, CSS Variables, Google Fonts
- **Performance Optimized**: Minimal dependencies, efficient animations

## Project Structure

```
shreechetan-foundation/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── assets/
│   └── images/         # Image assets
└── README.md           # This file
```

## Getting Started

### Local Development

1. **Clone or download** the project files to your local machine
2. **Navigate** to the project directory
3. **Open `index.html`** in your web browser by either:
   - Double-clicking the file
   - Right-clicking and selecting "Open with" → your preferred browser
   - Using a local server (recommended for development)

### Using a Local Server (Recommended)

For better development experience and to avoid CORS issues:

#### Using Python (if installed):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js (if installed):
```bash
# Install a simple server globally
npm install -g http-server

# Run the server
http-server
```

#### Using VS Code:
Install the "Live Server" extension and right-click on `index.html` → "Open with Live Server"

Then open your browser and navigate to `http://localhost:8000` (or the port shown in your terminal).

## Deployment

### GitHub Pages (Free)

1. **Create a GitHub repository** for your project
2. **Upload all files** to the repository
3. **Go to repository Settings** → Pages
4. **Select source**: Deploy from a branch → main → root
5. **Your site will be available** at `https://yourusername.github.io/repository-name`

### Netlify (Free)

1. **Visit [netlify.com](https://netlify.com)**
2. **Drag and drop** your project folder to the deployment area
3. **Your site will be live** with a generated URL
4. **Optional**: Connect to GitHub for automatic deployments

### Other Options

- **Vercel**: Similar to Netlify, supports drag-and-drop deployment
- **Surge.sh**: Command-line deployment tool
- **Firebase Hosting**: Google's hosting platform

## Customization

### Colors and Styling

Edit the CSS variables in `styles.css` at the top of the file:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #059669;
  --accent-color: #dc2626;
  /* ... other variables */
}
```

### Content

All content can be edited directly in `index.html`. Key sections to update:

- Hero title and description
- About section (mission, vision, values)
- Services/programs
- Impact statistics
- News and updates
- Testimonials
- Contact information

### Images

Replace placeholder images in the `assets/images/` folder with your own:

- `logo.svg` - Foundation logo
- `hero-image.jpg` - Main hero image
- `news-1.jpg`, `news-2.jpg`, `news-3.jpg` - News article images
- `testimonial-1.jpg`, `testimonial-2.jpg`, `testimonial-3.jpg` - Testimonial photos
- `gallery-1.jpg` through `gallery-6.jpg` - Gallery images

## Payment Integration

### Current State
The donation form is currently a **client-side mock** that simulates the donation process.

### Stripe Integration (Production)

To integrate real payment processing with Stripe:

1. **Server-side Setup** (Node.js/Python/PHP):
   ```javascript
   // Example Node.js with Express
   app.post('/create-payment-intent', async (req, res) => {
     const { amount, currency } = req.body;
     
     const paymentIntent = await stripe.paymentIntents.create({
       amount: amount,
       currency: currency,
     });
     
     res.send({
       clientSecret: paymentIntent.client_secret
     });
   });
   ```

2. **Frontend Integration**:
   Replace the mock donation handler in `script.js` with Stripe's client-side library:
   ```javascript
   // Include Stripe.js
   const stripe = Stripe('your-publishable-key');
   
   // Replace handleDonationFormSubmit function
   async function handleDonationFormSubmit(e) {
     e.preventDefault();
     
     const response = await fetch('/create-payment-intent', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ amount: selectedDonationAmount * 100 })
     });
     
     const { clientSecret } = await response.json();
     
     const result = await stripe.confirmCardPayment(clientSecret, {
       payment_method: {
         card: cardElement,
         billing_details: { name: formData.get('donor-name') }
       }
     });
     
     if (result.error) {
       // Handle error
     } else {
       // Payment succeeded
       showSuccessModal('Payment Successful!', 'Thank you for your donation!');
     }
   }
   ```

3. **Security Considerations**:
   - Never expose secret keys on the client-side
   - Validate all payments on the server
   - Use HTTPS in production
   - Implement proper error handling

## Form Testing

### Volunteer Form
- Test validation with empty fields
- Test email format validation
- Test phone number validation
- Submit form to see success message

### Donation Form
- Test different amount selections
- Test custom amount input
- Test monthly vs one-time selection
- Submit to see mock success response

## Browser Support

- **Modern browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **Features used**: CSS Grid, Flexbox, ES6+, Intersection Observer
- **Fallbacks**: Graceful degradation for older browsers

## Performance Optimization

- **Images**: Optimize images before deployment (use WebP format if possible)
- **CSS**: Already minified for production
- **JavaScript**: Consider minification for production
- **Fonts**: Google Fonts are loaded with `font-display: swap`

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels and attributes
- Keyboard navigation support
- Focus management in modals
- Alt text for images
- High contrast color scheme
- Screen reader compatible

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support regarding this website:
- Email: info@shreechetanfoundation.org
- Phone: +91-987-654-3210

---

**Note**: This is a static website template. For a full-featured nonprofit website, consider adding:
- Content Management System (CMS)
- Backend database for donations and volunteers
- Email newsletter integration
- Blog/news management system
- Social media integration
- Analytics tracking

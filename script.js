// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCTqKIqS_11BzwNQA-fJEIWYJnOz9kCaSc",
    authDomain: "comparecart-53ddf.firebaseapp.com",
    projectId: "comparecart-53ddf",
    storageBucket: "comparecart-53ddf.appspot.com",
    messagingSenderId: "28060506802",
    appId: "1:28060506802:web:6ff34560c34a2087c207ab"
};
// Initialize Firebase
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Mock product data (to be replaced by an API call)
let products = [];
// A pristine copy of the original product order
let originalProducts = [];

async function fetchProducts() {
    // Simulate API delay
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Cetaphil Paraben, Sulphate-Free Gentle Skin Hydrating Face Wash Cleanser with Niacinamide, Vitamin B5 for Dry to Normal, Sensitive Skin - 118 ml", image: "images/cleanser.png", prices: [{ store: 'Amazon', price: '₹359', link: 'https://amzn.to/4cJbGQQ' }, { store: 'Flipkart', price: '₹359', link: 'https://www.flipkart.com/cetaphil-gentle-skin-cleanser-mild-non-irritating-formula-dry-normal-sensitive-face-wash/p/itmadc9349d60faf?pid=CNRFPNR7MFKQ43KV&lid=LSTCNRFPNR7MFKQ43KVGVG5CR&marketplace=FLIPKART&q=Cetaphil+Face+Wash&store=g9b%2Fema%2F5la&spotlightTagId=default_BestsellerId_g9b%2Fema%2F5la&srno=s_1_3&otracker=search&fm=organic&iid=5050f85f-a82f-4344-9dd9-14be3a17926f.CNRFPNR7MFKQ43KV.SEARCH&ppt=sp&ppn=sp&ssid=ngwhp1un5c0000001768109880084&qH=7564c904f779cd16' }] },
                { id: 2, name: "Ant Esports GP110 Wired Gamepad, Compatible for PC & Laptop Computer (Windows 10/8 /7) / PS3 / Android", image: "images/controller.png", prices: [{ store: 'Amazon', price: '₹889', link: 'https://amzn.to/3LByoON' }, { store: 'Flipkart', price: '₹899', link: 'http://dl.flipkart.com/dl/ant-esports-gp110-wired-compatible-pc-laptop-computer-gamepad/p/itm7c6f0cdd7057d?pid=ACCG9J8APKQ9DUSH&marketplace=FLIPKART&cmpid=product.share.pp&lid=LSTACCG9J8APKQ9DUSHKTSLMW' }] },
                { id: 3, name: "Dasher Sea Salt Spray (100 ML) Hair Volume, Texture, Smooth Hair With Bhringraj, Vitamin E - Hair Styling, Pack of 1", image: "images/hairspray.png", prices: [{ store: 'Amazon', price: '₹319', link: 'https://amzn.to/3Lv7zfj' }, { store: 'Flipkart', price: '₹350', link: 'https://www.flipkart.com/dasher-sea-salt-spray-100ml-hair-volume-texture-heat-protectant-hold-styling/p/itme55feb03b55f2?pid=HSYGJ4ZUQDZ7YCDV&lid=LSTHSYGJ4ZUQDZ7YCDVLKHRUY&marketplace=FLIPKART&q=Dasher+Sea+Salt+Spray&store=g9b%2Flcf%2Fqqm&srno=s_1_1&otracker=search&fm=organic&iid=b24bc198-c7de-4c0a-96df-4ffc1b9f10ca.HSYGJ4ZUQDZ7YCDV.SEARCH&ppt=sp&ppn=sp&ssid=cgrrh6li0g0000001768110035805&qH=e1c5dc865a6d850b' }] },
                { id: 4, name: "Apple MacBook Air Laptop: Apple M1 chip, 13.3-inch/33.74 cm Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Space Grey", image: "images/laptop.png", prices: [{ store: 'Amazon', price: '₹66,990', link: 'https://amzn.to/3YaXgVm' }, { store: 'Flipkart', price: '₹66,990', link: 'https://www.flipkart.com/search?q=Apple+MacBook+Air' }] },
                { id: 5, name: "Campus Men Trophy Sneakers", image: "images/shoes.png", prices: [{ store: 'Amazon', price: '₹899', link: 'https://amzn.to/3YceBgp' }, { store: 'Flipkart', price: '₹1,099', link: 'https://www.flipkart.com/search?q=Campus+Trophy+Sneakers' }] },
                { id: 6, name: "Apple Watch Series 11 GPS 46mm Jet Black Aluminium Case with Black Sport Band - M/L", image: "images/watch.png", prices: [{ store: 'Amazon', price: '₹49,900', link: 'https://amzn.in/d/dqF77u2' }, { store: 'Flipkart', price: '₹41,999', link: 'https://www.flipkart.com/search?q=Apple+Watch+Series+9' }] },
                { id: 7, name: "Travel Adapter USB C, Universal All in One Worldwide Travel Adapter Fast Charge GaN PD3.0 Type C USB-A Quick Charging Ports Power Converters Wall Charger AC Power Plug Adapter for USA EU UK AUS Black", image: "images/adapter.jpg", prices: [{ store: 'Amazon', price: '₹499', link: 'https://a.co/d/fmatn9L' }, { store: 'Flipkart', price: '₹449', link: 'https://www.flipkart.com/search?q=Adapter' }] },
                { id: 8, name: "boAt Airdopes Prime 701 ANC (2025 Launch),46dB Hybrid ANC, 50Hr Battery, Real Spatial Audio,Multidevice Connect,App Support, Bluetooth Earbuds, TWS Ear Buds Wireless Earphones with mic (Obsidian Grey)", image: "images/airpods.jpg", prices: [{ store: 'Amazon', price: '₹1,999', link: 'https://amzn.in/d/1VgOwfX' }, { store: 'Flipkart', price: '₹1,499', link: 'https://www.flipkart.com/search?q=Airpods' }] },
                { id: 9, name: "WALKENT Stylish 15.6 Laptop Bag, Premium Leather, Waterproof, Backpack with Front & Side Pockets for Travel Office College Men Women 28L, 1 Compartment", image: "images/bag.png", prices: [{ store: 'Amazon', price: '₹2,490', link: 'https://amzn.in/d/1M6xYGw' }, { store: 'Flipkart', price: '₹799', link: 'https://www.flipkart.com/search?q=Bag' }] },
                { id: 10, name: "Sony Alpha ILCE-7M3K Full-Frame 24.2MP Mirrorless Digital SLR Camera with 28-70mm Zoom Lens | 4K Full Frame | Real-Time Eye Auto Focus | Tiltable LCD, Low Light Camera - Black", image: "images/camera.png", prices: [{ store: 'Amazon', price: '₹1,33,489', link: 'https://amzn.in/d/go442yB' }, { store: 'Flipkart', price: '₹1,33,489', link: 'https://www.flipkart.com/search?q=Camera' }] },
                { id: 11, name: "VIMTAG Indoor Camera, 2.5K/4MP HD 360° Pan/Tilt WiFi Camera for Dog/Pet/Baby/Home Security, AI Human/Sound/Motion Detection, Night Vision, 2-Way Audio, Cloud/Max 512GB TF Card Storage, Support Alexa", image: "images/cctv.jpg", prices: [{ store: 'Amazon', price: '₹2,500', link: 'https://a.co/d/10CADmx' }, { store: 'Flipkart', price: '₹2,400', link: 'https://www.flipkart.com/search?q=CCTV' }] },
                { id: 12, name: "CB-COLEBROOK Men's Casual Button Down Shirts Long Sleeve Linen Shirt Fashion Textured Beach Summer Shirts| Men Stylish Shirt | Men Fancy (Available in Plus Size)", image: "images/clothes.jpg", prices: [{ store: 'Amazon', price: '₹495', link: 'https://amzn.in/d/5ZhXQbc' }, { store: 'Flipkart', price: '₹599', link: 'https://www.flipkart.com/search?q=Clothes' }] },
                { id: 13, name: "Women Viscose Rayon Anarkali Maternity and Nursing Kurta Set with Dupatta - Brown Floral and Geometric Pattern, 3/4 Sleeves, Comfortable Fit", image: "images/dress.jpg", prices: [{ store: 'Amazon', price: '₹749', link: 'https://amzn.in/d/jdpOLKV' }, { store: 'Flipkart', price: '₹899', link: 'https://www.flipkart.com/search?q=Dress' }] },
                { id: 14, name: "ANNI DESIGNER Women's Cotton Blend Straight Printed Kurta with Pant & Dupatta", image: "images/dress1.jpg", prices: [{ store: 'Amazon', price: '₹1,299', link: 'https://amzn.in/d/9fDc4Ix' }, { store: 'Flipkart', price: '₹1,199', link: 'https://www.flipkart.com/search?q=Dress' }] },
                { id: 15, name: "Women's Cotton Blend T-Shirt & Pyjama Ethnic Co Ord Set, Printed Night Suit, Western Dress, Sleepwear with Relaxed Fit and Stylish Design", image: "images/dress2.jpg", prices: [{ store: 'Amazon', price: '₹1,499', link: 'https://amzn.in/d/3YwCNbw' }, { store: 'Flipkart', price: '₹1,399', link: 'https://www.flipkart.com/search?q=Dress' }] },
                { id: 16, name: "C J Enterprise Women's Pure Kanjivaram Silk Saree Soft Banarasi Style Wedding With Blouse Piece (Vruksh-51)", image: "images/dress3.jpg", prices: [{ store: 'Amazon', price: '₹1,199', link: 'https://www.amazon.in/s?k=Dress' }, { store: 'Flipkart', price: '₹1,099', link: 'https://www.flipkart.com/search?q=Dress' }] },
                { id: 17, name: "boAt Rockerz 255 Z Plus, AI-Enx Tech, Spatial Audio, 50HRS Battery, Low Latency Mode, Fast Charge, App Support, IPX4 BT V5.3, Bluetooth Neckband, Wireless With Mic In ear Phones (Active/Classic Black)", image: "images/earbands.png", prices: [{ store: 'Amazon', price: '₹999', link: 'https://amzn.in/d/a7Wom0f' }, { store: 'Flipkart', price: '₹249', link: 'https://www.flipkart.com/search?q=Earbands' }] },
                { id: 18, name: "Dot & Key Barrier Repair Hydrating Gentle Face Wash With Probiotics 15ml", image: "images/facewash.png", prices: [{ store: 'Amazon', price: '₹99', link: 'https://amzn.in/d/drtq1SR' }, { store: 'Flipkart', price: '₹240', link: 'https://www.flipkart.com/search?q=Facewash' }] },
                { id: 19, name: "Boldfit Wrist Strap Supporter For Gym (Grey)", image: "images/gym.png", prices: [{ store: 'Amazon', price: '₹500', link: 'https://www.amazon.in/s?k=Gym+Equipment' }, { store: 'Flipkart', price: '₹1,450', link: 'https://www.flipkart.com/search?q=Gym+Equipment' }] },
                { id: 20, name: "soundcore by Anker Q20i Wireless Bluetooth Over-Ear Headphones with Hybrid Active Noise Cancelling, 40h Playtime in ANC Mode, Hi-Res Audio, Deep Bass, Personalization via App (Black)", image: "images/headphone.png", prices: [{ store: 'Amazon', price: '₹1,999', link: 'https://amzn.in/d/7jtRoxj' }, { store: 'Flipkart', price: '₹1,899', link: 'https://www.flipkart.com/search?q=Headphone' }] },
                { id: 21, name: "Apple iPhone 15 Pro Max (512 GB) - Black Titanium", image: "images/iphoneee.png", prices: [{ store: 'Amazon', price: '₹65,999', link: 'https://amzn.in/d/4fLUJCx' }, { store: 'Flipkart', price: '₹64,999', link: 'https://www.flipkart.com/search?q=iPhone' }] },
                { id: 22, name: "Ben Martin Men Jeans || Baggy Fit Jean's for Man || Loose Fit High Rise Denim || Stretchable Casual Wear Jean,s || Dance Rap Rapping Style Pant for Men || Denim Cotton Jeans (0)", image: "images/jeans.jpg", prices: [{ store: 'Amazon', price: '₹1,299', link: 'https://amzn.in/d/ctIXnfN' }, { store: 'Flipkart', price: '₹1,199', link: 'https://www.flipkart.com/search?q=Jeans' }] },
                { id: 23, name: "MSI CreatorPro X17 HX, Intel 13th Gen. i9-13980HX,44CM UHD 144Hz Mini LED Creator Laptop (64GB/4TB NVMe SSD/Windows 11 Pro/NVIDIA RTX™ 3500 Ada, GDDR6 12GB/Core Black/3.3Kg), A13VKS-249IN", image: "images/laptop1.png", prices: [{ store: 'Amazon', price: '₹45,000', link: 'https://amzn.in/d/9Ajrvtw' }, { store: 'Flipkart', price: '₹44,000', link: 'https://www.flipkart.com/search?q=Laptop' }] },
                { id: 24, name: "HP Victus Gaming Laptop,12th Gen Intel Core i5-12450H,4GB RTX 3050 GPU,15.6-inch(39.6 cm),FHD,IPS,16GB DDR4,512GB SSD,Backlit KB,Dual Speakers (MSO, Blue,2.37 kg),fa0555tx", image: "images/laptop2.png", prices: [{ store: 'Amazon', price: '₹55,000', link: 'https://amzn.in/d/2CV2L2i' }, { store: 'Flipkart', price: '₹54,000', link: 'https://www.flipkart.com/search?q=Laptop' }] },
                { id: 25, name: "Minimalist Brightening & SPF Skincare Gift Set | Premium Gift Kit for Women & Men | Serum & Sunscreen Combo", image: "images/minimalist.jpg", prices: [{ store: 'Amazon', price: '₹1,199', link: 'https://amzn.in/d/9xaKVze' }, { store: 'Flipkart', price: '₹549', link: 'https://www.flipkart.com/search?q=Minimalist' }] },
                { id: 26, name: "(Refurbished) OnePlus Nord CE4 Lite 5G (Super Silver, 8GB RAM, 256GB Storage)", image: "images/mobile.png", prices: [{ store: 'Amazon', price: '₹15,000', link: 'https://amzn.in/d/3LFYRgN' }, { store: 'Flipkart', price: '₹14,500', link: 'https://www.flipkart.com/search?q=Mobile' }] },
                { id: 27, name: "ZEBRONICS Zeb-Jaguar Wireless Mouse, 2.4GHz with USB Nano Receiver, High Precision Optical Tracking, 4 Buttons, Plug & Play, Ambidextrous, for PC/Mac/Laptop (Black+Grey)", image: "images/mouse.png", prices: [{ store: 'Amazon', price: '₹299', link: 'https://amzn.in/d/bH0p5vz' }, { store: 'Flipkart', price: '₹449', link: 'https://www.flipkart.com/search?q=Mouse' }] },
                { id: 28, name: "GIVA 925 Silver Jewellery|Gifts for Women & Girls|Wedding and Christmas Gifts|6 Months Warranty|Free Life Time Plating", image: "images/necklace.png", prices: [{ store: 'Amazon', price: '₹500', link: 'https://amzn.in/d/892ShRq' }, { store: 'Flipkart', price: '₹450', link: 'https://www.flipkart.com/search?q=Necklace' }] },
                { id: 29, name: "PROTOUCH Wrinkle and Anti Ageing Devices", image: "images/protouch.png", prices: [{ store: 'Amazon', price: '₹1,200', link: 'https://amzn.in/d/1KXzgBr' }, { store: 'Flipkart', price: '₹1,100', link: 'https://www.flipkart.com/search?q=Protouch' }] },
                { id: 30, name: "Sony PlayStation5 Gaming Console (Slim)", image: "images/ps5.png", prices: [{ store: 'Amazon', price: '₹49,990', link: 'https://amzn.in/d/j3fA5TM' }, { store: 'Flipkart', price: '₹49,990', link: 'https://www.flipkart.com/search?q=PS5' }] },
                { id: 31, name: "GIGABYTE Geforce RTX 4060 Eagle Oc 8G Graphics Card, 3X Windforce Fans, 8Gb 128-Bit Gddr6, Gv-N4060Eagle Oc-8Gd Video Card, pci_e_x16", image: "images/rtx.png", prices: [{ store: 'Amazon', price: '₹36,243', link: 'https://amzn.in/d/59Eu2qj' }, { store: 'Flipkart', price: '₹28,500', link: 'https://www.flipkart.com/search?q=RTX+4060' }] },
                { id: 32, name: "Women's Lavender Flat Sandals with Crystal Strap | Comfortable Slip-On for Casual & Occasional Wear", image: "images/sandals.png", prices: [{ store: 'Amazon', price: '₹589', link: 'https://amzn.in/d/eH3fMZq' }, { store: 'Flipkart', price: '₹699', link: 'https://www.flipkart.com/search?q=Sandals' }] },
                { id: 33, name: "SanDisk Extreme SDHC, SDXNE 16GB, U3, C10, UHS-I, 90MB/s R, 40MB/s W, 4x6, Lifetime Limited", image: "images/sandisk.png", prices: [{ store: 'Amazon', price: '₹1499', link: 'https://amzn.in/d/2k6wnn6' }, { store: 'Flipkart', price: '₹380', link: 'https://www.flipkart.com/search?q=SanDisk' }] },
                { id: 34, name: "Novo 24 Pieces Precision Screwdriver Set, Multifunction Magnetic Driver Bit Set, Pocket Screwdriver Tool Set, Mini Screwdriver Kit, Repair Tool Kit for Electronics, Tablet, Cellphone", image: "images/screw.jpg", prices: [{ store: 'Amazon', price: '₹229', link: 'https://amzn.in/d/gOVVTsn' }, { store: 'Flipkart', price: '₹90', link: 'https://www.flipkart.com/search?q=Screw' }] },
                { id: 35, name: "PRO Power Sneaker Cleaning Shampoo | Cleaning Shampoo for Sports Shoes Sneakers and Canvas I White Shoe Cleaner | Shoe Cleaner Foam Spray", image: "images/shoecleaner.png", prices: [{ store: 'Amazon', price: '₹309', link: 'https://amzn.in/d/dKGyJuZ' }, { store: 'Flipkart', price: '₹300', link: 'https://www.flipkart.com/search?q=Shoe+Cleaner' }] },
                { id: 36, name: "Men's Athletic Running Shorts, 2-Pack, Black and Blue, Quick-Dry Fabric, Zip Pockets, Regular", image: "images/shorts.jpg", prices: [{ store: 'Amazon', price: '₹479', link: 'https://amzn.in/d/85Q3dix' }, { store: 'Flipkart', price: '₹449', link: 'https://www.flipkart.com/search?q=Shorts' }] },
                { id: 37, name: "Allen Solly Men Polo | Half Seelves Regular Fit | 60% Cotton with Banded Collar", image: "images/tshirt.jpg", prices: [{ store: 'Amazon', price: '₹629', link: 'https://amzn.in/d/dIVm0oa' }, { store: 'Flipkart', price: '₹549', link: 'https://www.flipkart.com/search?q=T-Shirt' }] },
            ]);
        }, 200);
    });
}                   
document.addEventListener('DOMContentLoaded', async () => {
    // Show spinner while fetching
    const productGrid = document.getElementById('product-grid');
    const priceGrid = document.getElementById('price-comparison-grid');
    const spinnerHtml = '<div class="loading-spinner"></div>';
    if (productGrid) productGrid.innerHTML = spinnerHtml;
    if (priceGrid) priceGrid.innerHTML = spinnerHtml;

    originalProducts = await fetchProducts();
    products = [...originalProducts];


    // Login/Register Page Logic
    if (document.body.contains(document.getElementById('login-form'))) {
        const loginButton = document.getElementById('login-button');
        const registerButton = document.getElementById('register-button');

        if(registerButton) {
            registerButton.addEventListener('click', (e) => {
                e.preventDefault();
                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;
                const confirmPassword = document.getElementById('confirm-password').value;
                const fullName = document.getElementById('full-name').value;
                const age = document.getElementById('age').value;

                if (!validate_email(email) || !validate_password(password)) {
                    alert('Invalid email or password (password should be at least 6 characters).');
                    return;
                }
                if (password !== confirmPassword) {
                    alert('Passwords do not match!');
                    return;
                }
                if (!validate_field(fullName) || !validate_field(age)) {
                    alert('Please fill out all fields.');
                    return;
                }

                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        const database_ref = firebase.database().ref();
                        const user_data = {
                            email: email,
                            full_name: fullName,
                            age: age,
                            last_login: Date.now()
                        };
                        database_ref.child('users/' + user.uid).set(user_data);
                        alert('User Created!');
                        window.location.href = 'main.html';
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            });
        }

        if(loginButton) {
            loginButton.addEventListener('click', (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;

                if (!validate_email(email) || !validate_password(password)) {
                    alert('Invalid email or password.');
                    return;
                }

                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        const database_ref = firebase.database().ref();
                        database_ref.child('users/' + user.uid).update({ last_login: Date.now() });
                        alert('User Logged In!');
                        window.location.href = 'main.html';
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            });
        }

        function validate_email(email) {
            const expression = /^[^@]+@\w+(\.\w+)+\w$/;
            return expression.test(email);
        }

        function validate_password(password) {
            return password.length >= 6;
        }

        function validate_field(field) {
            return field != null && field.length > 0;
        }
    }

    // Main Page Logic
    if (document.body.contains(document.getElementById('product-grid'))) {
        const productGrid = document.getElementById('product-grid');
        const searchBar = document.getElementById('search-bar');
        const searchButton = document.getElementById('search-button');
        const navFavorites = document.getElementById('nav-favorites');
        const sortBy = document.getElementById('sort-by');
        const filterButton = document.getElementById('filter-button');
        
        let userFavorites = new Set();
        let showFavoritesOnly = false;

        // Listen for auth changes to load favorites
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref('users/' + user.uid + '/favorites').on('value', (snapshot) => {
                    const data = snapshot.val();
                    userFavorites = new Set(data ? Object.keys(data) : []);
                    filterProducts(); // Refresh grid
                });
            } else {
                userFavorites = new Set();
                filterProducts();
            }
        });

        function renderProducts(productsToRender) {
            productGrid.innerHTML = '';
            productsToRender.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';

                // Calculate prices and stock status
                let priceHtml = '';
                let isOutOfStock = false;
                let minPrice = null;
                let maxPrice = null;

                if (product.prices && product.prices.length > 0) {
                    const parsedPrices = product.prices.map(p => {
                        return { original: p.price, value: parseFloat(p.price.replace(/[^0-9.]/g, '')) };
                    }).filter(p => !isNaN(p.value));

                    if (parsedPrices.length > 0) {
                        parsedPrices.sort((a, b) => a.value - b.value);
                        minPrice = parsedPrices[0].original;
                        maxPrice = parsedPrices[parsedPrices.length - 1].original;
                        
                        if (minPrice === maxPrice) {
                            priceHtml = `<div class="product-card__price" style="font-weight: bold; color: green; margin: 5px 0;">${minPrice}</div>`;
                        } else {
                            priceHtml = `<div class="product-card__price" style="font-weight: bold; margin: 5px 0;"><span style="color: green;">${minPrice}</span> - <span style="color: red;">${maxPrice}</span></div>`;
                        }
                    } else { isOutOfStock = true; }
                } else { isOutOfStock = true; }

                if (isOutOfStock) {
                    priceHtml = '<div class="product-card__price" style="color: gray; margin: 5px 0;">Out of Stock</div>';
                    productCard.style.backgroundColor = '#f0f0f0';
                    productCard.style.filter = 'grayscale(100%)';
                }

                const isFav = userFavorites.has(product.id.toString());
                productCard.innerHTML = `
                    <button class="favorite-btn ${isFav ? 'active' : ''}" data-id="${product.id}">♥</button>
                    <img src="${product.image}" alt="${product.name}" class="product-card__image">
                    <div class="product-card__content">
                        <h3 class="product-card__name" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; min-height: 2.4em;">${product.name}</h3>
                        ${priceHtml}
                        <a href="compare.html?product=${product.id}&name=${encodeURIComponent(product.name)}" class="product-card__button" ${isOutOfStock ? 'style="pointer-events: none; background-color: gray;"' : ''}>${isOutOfStock ? 'Unavailable' : 'Compare Prices'}</a>
                    </div>
                `;
                productGrid.appendChild(productCard);
            });
        }

        function filterProducts() {
            const searchTerm = searchBar.value.toLowerCase();
            let filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm)
            );
            
            if (showFavoritesOnly) {
                filteredProducts = filteredProducts.filter(p => userFavorites.has(p.id.toString()));
            }
            
            renderProducts(filteredProducts);
        }

        // --- SORTING & FILTERING ---

        // Helper to get the minimum price of a product
        function getMinPrice(product) {
            if (!product.prices || product.prices.length === 0) {
                return Infinity; // Treat products without prices as most expensive
            }
            const parsedPrices = product.prices.map(p => parseFloat(p.price.replace(/[^0-9.]/g, '')));
            return Math.min(...parsedPrices.filter(p => !isNaN(p)));
        }

        // Sort products based on the selected criteria
        function sortProducts() {
            const sortValue = sortBy.value;

            if (sortValue === 'price-asc') {
                products.sort((a, b) => getMinPrice(a) - getMinPrice(b));
            } else if (sortValue === 'price-desc') {
                products.sort((a, b) => getMinPrice(b) - getMinPrice(a));
            } else if (sortValue === 'popularity') {
                // Placeholder: Revert to the original fetched order
                products = [...originalProducts].reverse();
            }
            
            // Re-apply search and favorite filters after sorting
            filterProducts();
        }

        // --- EVENT LISTENERS ---

        // Handle Favorite Button Click
        productGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('favorite-btn')) {
                const user = firebase.auth().currentUser;
                if (!user) {
                    alert('Please log in to save favorites.');
                    return;
                }
                const productId = e.target.getAttribute('data-id');
                const ref = firebase.database().ref('users/' + user.uid + '/favorites/' + productId);
                
                if (userFavorites.has(productId)) {
                    ref.remove();
                } else {
                    ref.set(true);
                }
            }
        });

        // Handle Favorites Nav Link Click
        if (navFavorites) {
            navFavorites.addEventListener('click', (e) => {
                e.preventDefault();
                showFavoritesOnly = !showFavoritesOnly;
                navFavorites.textContent = showFavoritesOnly ? 'Show All' : 'Favorites';
                filterProducts();
            });
        }

        searchBar.addEventListener('input', filterProducts);
        searchButton.addEventListener('click', filterProducts);
        
        // Add event listeners for sorting and filtering
        sortBy.addEventListener('change', sortProducts);
        filterButton.addEventListener('click', () => {
            alert('Filter panel functionality will be implemented here!');
        });


        renderProducts(products);

        // Back to Top Button
        const backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'back-to-top';
        backToTopBtn.innerHTML = '&#8679;';
        document.body.appendChild(backToTopBtn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Comparison Page Logic
    if (document.body.contains(document.getElementById('price-comparison-grid'))) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('product'));
        
        // Use the original, unsorted array for lookups
        const product = originalProducts.find(p => p.id === productId);

        const productNameElement = document.getElementById('product-name');
        const priceComparisonGrid = document.getElementById('price-comparison-grid');

        if (product && product.prices) {
            productNameElement.textContent = product.name;
            priceComparisonGrid.innerHTML = ''; // Clear spinner
            product.prices.forEach(priceInfo => {
                const priceCard = document.createElement('div');
                priceCard.className = 'price-card';
                priceCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="price-card__image">
                    <h3 class="price-card__store">${priceInfo.store}</h3>
                    <p class="price-card__price">${priceInfo.price}</p>
                    <a href="${priceInfo.link}" target="_blank" class="price-card__button">Buy Now</a>
                `;
                priceComparisonGrid.appendChild(priceCard);
            });
        } else {
            productNameElement.textContent = "Product Not Found";
            priceComparisonGrid.innerHTML = '<p>Sorry, the product you are looking for could not be found.</p>';
        }
    }

    // Profile Page Logic
    const profileContent = document.getElementById('profile-content');
    if (profileContent) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const database_ref = firebase.database().ref();
                database_ref.child('users/' + user.uid).once('value').then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        const lastUpdate = userData.last_profile_update || 0;
                        const now = Date.now();
                        const cooldownTime = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
                        const timeDiff = now - lastUpdate;
                        const canUpdate = timeDiff > cooldownTime;
                        const daysRemaining = Math.ceil((cooldownTime - timeDiff) / (24 * 60 * 60 * 1000));

                        profileContent.innerHTML = `
                            <div style="font-size: 1.1rem; line-height: 1.8;">
                                <div style="margin-bottom: 15px;">
                                    <label style="display:block; font-weight:bold; margin-bottom:5px;">Full Name</label>
                                    <input type="text" id="edit-fullname" value="${userData.full_name || ''}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" ${!canUpdate ? 'disabled' : ''}>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label style="display:block; font-weight:bold; margin-bottom:5px;">Age</label>
                                    <input type="number" id="edit-age" value="${userData.age || ''}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" ${!canUpdate ? 'disabled' : ''}>
                                </div>
                                <p><strong>Email:</strong> ${userData.email || user.email}</p>
                                <p><strong>Last Login:</strong> ${userData.last_login ? new Date(userData.last_login).toLocaleString() : 'N/A'}</p>
                                
                                ${!canUpdate ? `<p style="color: #dc3545; font-size: 0.9rem;">You can update your profile again in ${daysRemaining} days.</p>` : ''}
                                
                                <button id="save-profile-btn" class="product-card__button" style="margin-top: 15px; ${!canUpdate ? 'background-color: #6c757d; cursor: not-allowed;' : ''}" ${!canUpdate ? 'disabled' : ''}>
                                    ${canUpdate ? 'Update Profile' : 'Update Locked'}
                                </button>
                            </div>
                        `;

                        if (canUpdate) {
                            document.getElementById('save-profile-btn').addEventListener('click', () => {
                                const newName = document.getElementById('edit-fullname').value;
                                const newAge = document.getElementById('edit-age').value;

                                if (newName && newAge) {
                                    database_ref.child('users/' + user.uid).update({
                                        full_name: newName,
                                        age: newAge,
                                        last_profile_update: Date.now()
                                    }).then(() => {
                                        alert('Profile updated successfully!');
                                        window.location.reload();
                                    }).catch((error) => {
                                        alert('Error updating profile: ' + error.message);
                                    });
                                } else {
                                    alert('Please fill in all fields.');
                                }
                            });
                        }
                    } else {
                        profileContent.innerHTML = '<p style="text-align: center;">No profile data found.</p>';
                    }
                }).catch((error) => {
                    console.error(error);
                    profileContent.innerHTML = '<p style="text-align: center;">Error fetching profile data.</p>';
                });
            } else {
                window.location.href = 'index.html';
            }
        });
    }
});

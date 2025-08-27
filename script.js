
        let completedActivities = 0;
        const totalActivities = 4;
        
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // Progress tracking
        function updateProgress() {
            const progress = (completedActivities / totalActivities) * 100;
            document.getElementById('overall-progress').textContent = Math.round(progress);
        }
        
        // Scroll progress indicator
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById('scroll-progress').style.width = scrolled + '%';
        });
        
        // Animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0s';
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Start journey button
        function startJourney() {
            document.querySelector('#activities').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Activity 1: Self-Diagnosis
        function simulateAudio(activityNum) {
            const audioText = document.getElementById(`audio-text-${activityNum}`);
            audioText.classList.remove('hidden');
            
            // Simulate audio playback
            const playButton = event.target;
            playButton.classList.remove('fa-play');
            playButton.classList.add('fa-pause');
            
            setTimeout(() => {
                playButton.classList.remove('fa-pause');
                playButton.classList.add('fa-play');
            }, 3000);
        }
        
        function checkAnswer(activityNum) {
            const userInput = document.getElementById(`user-input-${activityNum}`).value;
            const result = document.getElementById(`result-${activityNum}`);
            const correctAnswer = "The weather forecast predicts heavy rainfall tomorrow afternoon.";
            
            if (userInput.trim() === '') {
                result.innerHTML = '<div class="bg-yellow-100 text-yellow-800 p-3 rounded-lg">Please write what you heard first!</div>';
                result.classList.remove('hidden');
                return;
            }
            
            const similarity = calculateSimilarity(userInput.toLowerCase(), correctAnswer.toLowerCase());
            
            if (similarity > 0.7) {
                result.innerHTML = '<div class="bg-green-100 text-green-800 p-3 rounded-lg"><i class="fas fa-check-circle mr-2"></i>Excellent! Your listening skills are improving!</div>';
                if (completedActivities < 1) {
                    completedActivities = 1;
                    updateProgress();
                }
            } else if (similarity > 0.4) {
                result.innerHTML = '<div class="bg-blue-100 text-blue-800 p-3 rounded-lg"><i class="fas fa-info-circle mr-2"></i>Good effort! Try listening again and focus on each word.</div>';
            } else {
                result.innerHTML = '<div class="bg-red-100 text-red-800 p-3 rounded-lg"><i class="fas fa-times-circle mr-2"></i>Keep practicing! The correct answer was: "' + correctAnswer + '"</div>';
            }
            
            result.classList.remove('hidden');
        }
        
        function calculateSimilarity(str1, str2) {
            const longer = str1.length > str2.length ? str1 : str2;
            const shorter = str1.length > str2.length ? str2 : str1;
            const editDistance = getEditDistance(longer, shorter);
            return (longer.length - editDistance) / longer.length;
        }
        
        function getEditDistance(str1, str2) {
            const matrix = [];
            for (let i = 0; i <= str2.length; i++) {
                matrix[i] = [i];
            }
            for (let j = 0; j <= str1.length; j++) {
                matrix[0][j] = j;
            }
            for (let i = 1; i <= str2.length; i++) {
                for (let j = 1; j <= str1.length; j++) {
                    if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    } else {
                        matrix[i][j] = Math.min(
                            matrix[i - 1][j - 1] + 1,
                            matrix[i][j - 1] + 1,
                            matrix[i - 1][j] + 1
                        );
                    }
                }
            }
            return matrix[str2.length][str1.length];
        }
        
        // Activity 2: Roleplay Practice
        function selectScenario(type) {
            const area = document.getElementById('roleplay-area');
            let content = '';
            
            switch(type) {
                case 'coffee':
                    content = `
                        <h4 class="text-xl font-semibold mb-4 text-gray-700">â Coffee Shop Roleplay</h4>
                        <div class="space-y-4">
                            <div class="bg-blue-50 p-4 rounded-lg">
                                <strong>Customer:</strong> "Hi, I'd like to order a coffee, please."
                            </div>
                            <div class="bg-green-50 p-4 rounded-lg">
                                <strong>Barista:</strong> "Of course! What size would you like?"
                            </div>
                            <div class="bg-blue-50 p-4 rounded-lg">
                                <strong>Customer:</strong> "A medium latte with oat milk, please."
                            </div>
                            <div class="bg-green-50 p-4 rounded-lg">
                                <strong>Barista:</strong> "Coming right up! That'll be $4.50."
                            </div>
                        </div>
                        <button onclick="completeRoleplay()" class="interactive-button text-white px-6 py-2 rounded-lg mt-4 w-full">
                            Practice Complete!
                        </button>
                    `;
                    break;
                case 'directions':
                    content = `
                        <h4 class="text-xl font-semibold mb-4 text-gray-700">ðºï¸ Asking Directions Roleplay</h4>
                        <div class="space-y-4">
                            <div class="bg-purple-50 p-4 rounded-lg">
                                <strong>Tourist:</strong> "Excuse me, how do I get to the train station?"
                            </div>
                            <div class="bg-orange-50 p-4 rounded-lg">
                                <strong>Local:</strong> "Go straight for two blocks, then turn left."
                            </div>
                            <div class="bg-purple-50 p-4 rounded-lg">
                                <strong>Tourist:</strong> "Is it walking distance?"
                            </div>
                            <div class="bg-orange-50 p-4 rounded-lg">
                                <strong>Local:</strong> "Yes, about 10 minutes on foot."
                            </div>
                        </div>
                        <button onclick="completeRoleplay()" class="interactive-button text-white px-6 py-2 rounded-lg mt-4 w-full">
                            Practice Complete!
                        </button>
                    `;
                    break;
                case 'shopping':
                    content = `
                        <h4 class="text-xl font-semibold mb-4 text-gray-700">ðï¸ Shopping Roleplay</h4>
                        <div class="space-y-4">
                            <div class="bg-pink-50 p-4 rounded-lg">
                                <strong>Customer:</strong> "Do you have this shirt in size medium?"
                            </div>
                            <div class="bg-yellow-50 p-4 rounded-lg">
                                <strong>Sales Associate:</strong> "Let me check for you. What color?"
                            </div>
                            <div class="bg-pink-50 p-4 rounded-lg">
                                <strong>Customer:</strong> "Blue or black, please."
                            </div>
                            <div class="bg-yellow-50 p-4 rounded-lg">
                                <strong>Sales Associate:</strong> "I have both! Here they are."
                            </div>
                        </div>
                        <button onclick="completeRoleplay()" class="interactive-button text-white px-6 py-2 rounded-lg mt-4 w-full">
                            Practice Complete!
                        </button>
                    `;
                    break;
            }
            
            area.innerHTML = content;
        }
        
        function completeRoleplay() {
            if (completedActivities < 2) {
                completedActivities = 2;
                updateProgress();
            }
            
            const area = document.getElementById('roleplay-area');
            area.innerHTML = `
                <div class="text-center">
                    <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-check text-white text-2xl"></i>
                    </div>
                    <h4 class="text-xl font-semibold text-green-800">Great Job!</h4>
                    <p class="text-green-600">You've completed the roleplay practice!</p>
                </div>
            `;
        }
        
        // Activity 3: Linguistic Tools
        function playMinimalPair(pair) {
            const feedback = document.getElementById('minimal-pair-feedback');
            feedback.classList.remove('hidden');
            
            if (completedActivities < 3) {
                completedActivities = 3;
                updateProgress();
            }
            
            setTimeout(() => {
                feedback.classList.add('hidden');
            }, 3000);
        }
        
        function playProsody(emphasis) {
            const feedback = document.getElementById('prosody-feedback');
            feedback.classList.remove('hidden');
            
            setTimeout(() => {
                feedback.classList.add('hidden');
            }, 3000);
        }
        
        // Activity 4: Kinesthetic Encoding
        function practiceKinesthetic(word) {
            const feedback = document.getElementById('kinesthetic-feedback');
            feedback.classList.remove('hidden');
            
            if (completedActivities < 4) {
                completedActivities = 4;
                updateProgress();
            }
            
            // Add shake animation to simulate movement
            event.currentTarget.style.animation = 'shake 0.5s ease-in-out';
            
            setTimeout(() => {
                event.currentTarget.style.animation = '';
                feedback.classList.add('hidden');
            }, 2000);
        }
        
        // Final Reflection
        function submitReflection() {
            const helpfulMethod = document.querySelector('input[name="helpful-method"]:checked');
            const continueMethods = document.querySelectorAll('input[name="continue-method"]:checked');
            
            if (!helpfulMethod) {
                alert('Please select which method helped you the most.');
                return;
            }
            
            if (continueMethods.length === 0) {
                alert('Please select at least one technique you plan to continue using.');
                return;
            }
            
            // Show success modal
            document.getElementById('success-modal').classList.remove('hidden');
        }
        
        function closeModal() {
            document.getElementById('success-modal').classList.add('hidden');
        }
        
        // Add shake animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
        
        // Initialize progress
        updateProgress();
    


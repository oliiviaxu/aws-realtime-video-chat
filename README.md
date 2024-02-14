
# Realtime Video Chat Application

This Realtime Video Chat application is built on AWS, leveraging the [Amazon Chime SDK JS](https://github.com/aws/amazon-chime-sdk-js), with custom modifications to enhance the user experience. Our modifications focus on improving the video chat interface by eliminating speaker search and flickering in the active tile view.

## Modifications

### Changes to Active Tile

- **Elimination of Speaker Search**: We've modified the logic for selecting the active tile to ensure a smoother user experience, reducing distractions during video calls.
- **Flicker Reduction**: Additional optimizations have been implemented to minimize or eliminate flickering when switching between active speakers.

## Deployment

This application is deployed using a serverless approach, detailed in the Amazon Chime SDK JS's [serverless demo guide](https://github.com/aws/amazon-chime-sdk-js/tree/main/demos/serverless). Follow the steps below to deploy your own instance of this application:

### Prerequisites

- AWS Account
- Node.js and npm installed
- AWS CLI configured with appropriate permissions

### Step 1: Clone the Repository

Clone this repository to get started with your deployment:

\```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/realtime-video-chat-application.git
cd realtime-video-chat-application
\```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

### Step 2: Deploy the Serverless Application

Navigate to the `demos/serverless` directory and run the deployment script:

\```bash
cd demos/serverless
npm install
npm run deploy
\```

This script will deploy the necessary AWS resources and output the URLs for your application.

### Step 3: Access Your Application

After deployment, access your application using the URLs provided by the deployment script. You'll find endpoints for the client application and the meeting service.

## Customization and Further Development

Feel free to explore the codebase and make further customizations. If you wish to contribute or suggest improvements, please create an issue or pull request in this repository.

## License

This project inherits the license from the [Amazon Chime SDK JS](https://github.com/aws/amazon-chime-sdk-js), which is specified in their repository.

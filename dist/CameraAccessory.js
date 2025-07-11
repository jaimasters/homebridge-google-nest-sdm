"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraAccessory = void 0;
const CameraStreamingDelegate_1 = require("./CameraStreamingDelegate");
const MotionAccessory_1 = require("./MotionAccessory");
class CameraAccessory extends MotionAccessory_1.MotionAccessory {
    constructor(api, log, platform, accessory, device) {
        super(api, log, platform, accessory, device);
        this.accessory.on("identify" /* IDENTIFY */, () => {
            this.log.info("%s identified!", this.accessory.displayName);
        });
        this.streamingDelegate = new CameraStreamingDelegate_1.CameraStreamingDelegate(log, api, this.platform, this.device, this.accessory);
        this.accessory.configureController(this.streamingDelegate.getController());
        // Start continuous streaming if enabled
        this.initializeContinuousStreaming();
    }
    async initializeContinuousStreaming() {
        // Add a delay to ensure the accessory is fully initialized
        setTimeout(async () => {
            try {
                await this.streamingDelegate.startContinuousStreaming();
            }
            catch (error) {
                this.log.error('Failed to initialize continuous streaming:', error, this.device.getDisplayName());
            }
        }, 5000); // 5 second delay
    }
}
exports.CameraAccessory = CameraAccessory;
//# sourceMappingURL=CameraAccessory.js.map
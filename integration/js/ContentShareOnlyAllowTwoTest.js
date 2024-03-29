const {
  ClickContentShareButton,
  JoinMeetingStep,
  AuthenticateUserStep,
  OpenAppStep,
} = require('./steps');
const {ContentShareVideoCheck, UserAuthenticationCheck} = require('./checks');
const {RosterCheck} = require('./checks');
const {TestUtils} = require('./node_modules/kite-common');
const {SdkTestUtils} = require('./utils/SdkTestUtils');
const SdkBaseTest = require('./utils/SdkBaseTest');
const {Window} = require('./utils/Window');
const { v4: uuidv4 } = require('uuid');

/**
 * Test that we only allow two content share at the same time
 * 1. First participant: Turn on content sharing and verify that the other 2 participants can see the screen
 * 2. Second participant: Turn on content sharing and verify that the other 2 participants can see the screen
 * 3. Third participant: Turn on content sharing and verify that there is no new content share
 */
class ContentShareOnlyAllowTwoTest extends SdkBaseTest {
  constructor(name, kiteConfig) {
    super(name, kiteConfig, 'ContentShareOnlyAllowTwoTest');
  }

  // Commented out the UserJoinedMeetingCheck because we already check it in the JoinMeetingStep
  async addUserToMeeting(attendee_id, sessionInfo) {
    await OpenAppStep.executeStep(this, sessionInfo);
    await AuthenticateUserStep.executeStep(this, sessionInfo, attendee_id);
    await UserAuthenticationCheck.executeStep(this, sessionInfo);
    await JoinMeetingStep.executeStep(this, sessionInfo, true);
    // await UserJoinedMeetingCheck.executeStep(this, sessionInfo, attendee_id);
  }

  async runIntegrationTest() {
    const session = this.seleniumSessions[0];
    const test_attendee_id_1 = uuidv4();
    const test_attendee_id_2 = uuidv4();
    const test_attendee_id_3 = uuidv4();
    const test_window_1 = await Window.existing(session.driver, 'TEST1');
    await test_window_1.runCommands(
      async () => await this.addUserToMeeting(test_attendee_id_1, session)
    );
    await TestUtils.waitAround(3000);
    // await test_window_1.runCommands(async () => await RosterCheck.executeStep(this, session, 1));
    //Turn on Content Share for first participant
    await test_window_1.runCommands(
      async () => await ClickContentShareButton.executeStep(this, session, 'ON')
    );
    await TestUtils.waitAround(3000);

    const test_window_2 = await Window.openNew(session.driver, 'TEST2');
    await test_window_2.runCommands(
      async () => await this.addUserToMeeting(test_attendee_id_2, session)
    );
    // await test_window_2.runCommands(async () => await RosterCheck.executeStep(this, session, 2));
    await TestUtils.waitAround(3000);
    //Turn on Content Share for second participant
    await test_window_2.runCommands(
      async () => await ClickContentShareButton.executeStep(this, session, 'ON')
    );
    await TestUtils.waitAround(3000);

    const test_window_3 = await Window.openNew(session.driver, 'TEST3');
    await test_window_3.runCommands(
      async () => await this.addUserToMeeting(test_attendee_id_3, session)
    );
    // await test_window_3.runCommands(async () => await RosterCheck.executeStep(this, session, 3));
    await TestUtils.waitAround(3000);
    //Turn on Content Share for third participant
    await test_window_3.runCommands(
      async () => await ClickContentShareButton.executeStep(this, session, 'ON')
    );
    await TestUtils.waitAround(3000);

    await test_window_3.runCommands(async () => await ContentShareVideoCheck.executeStep(this, session, "ON", test_attendee_id_1));
    await test_window_3.runCommands(async () => await ContentShareVideoCheck.executeStep(this, session, "ON", test_attendee_id_2));
    await test_window_3.runCommands(async () => await ContentShareVideoCheck.executeStep(this, session, "OFF", test_attendee_id_3));
    await test_window_3.runCommands(async () => await RosterCheck.executeStep(this, session, 5));
  }
}

module.exports = ContentShareOnlyAllowTwoTest;

(async () => {
  const kiteConfig = await TestUtils.getKiteConfig(__dirname);
  let test = new ContentShareOnlyAllowTwoTest('Only allow two content share test', kiteConfig);
  await test.run();
})();

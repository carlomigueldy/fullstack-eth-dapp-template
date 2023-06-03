import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ethers } from 'ethers';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('authenticate', () => {
    it('should authenticate', async () => {
      const timestamp = new Date().getTime();
      const signingMessage = `SIGNING_MESSAGE ${timestamp}`;

      const signer = ethers.Wallet.createRandom();
      const signature = await signer.signMessage(signingMessage);

      console.log('signature', signature);
      const recoveredSignerAddress = ethers.verifyMessage(
        signingMessage,
        signature,
      );

      console.log('recoveredSignerAddress', recoveredSignerAddress);
      console.log('signer.address', signer.address);

      expect(recoveredSignerAddress).toBe(signer.address);
    });
  });
});

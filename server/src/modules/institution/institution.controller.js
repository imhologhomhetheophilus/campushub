import { createInstitutionService } from './institution.service.js';

export async function createInstitution(req, res) {
  try {
    // Debug: Print everything received from Postman
    console.log('==============================');
    console.log('Institution Request Body:');
    console.log(req.body);
    console.log('==============================');

    const institutionId = await createInstitutionService(req.body);

    return res.status(201).json({
      success: true,
      message: 'Institution created successfully.',
      institution_id: institutionId,
    });
  } catch (error) {
    console.error('==============================');
    console.error('Institution Error:');
    console.error(error);
    console.error('==============================');

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

import {
  createLevelService,
  getAllLevelsService,
  getLevelByIdService,
  updateLevelService,
  deleteLevelService,
} from './level.service.js';

// ===================================
// Create Level
// ===================================
export async function createLevel(req, res) {
  try {
    const levelId = await createLevelService(req.body);

    return res.status(201).json({
      success: true,
      message: 'Level created successfully.',
      level_id: levelId,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Get All Levels
// ===================================
export async function getAllLevels(req, res) {
  try {
    const levels = await getAllLevelsService();

    return res.status(200).json({
      success: true,
      count: levels.length,
      data: levels,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Get Level By ID
// ===================================
export async function getLevelById(req, res) {
  try {
    const { id } = req.params;

    const level = await getLevelByIdService(id);

    return res.status(200).json({
      success: true,
      data: level,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Update Level
// ===================================
export async function updateLevel(req, res) {
  try {
    const { id } = req.params;

    await updateLevelService(id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Level updated successfully.',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

// ===================================
// Delete Level
// ===================================
export async function deleteLevel(req, res) {
  try {
    const { id } = req.params;

    await deleteLevelService(id);

    return res.status(200).json({
      success: true,
      message: 'Level deleted successfully.',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

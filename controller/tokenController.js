import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getAccessToken = async (req, res) => {
  try {
    // Ambil refresh token dari cookie, simpan ke dalam variabel "refreshToken"
    const refreshToken = req.cookies.refresh_token;

    // Kalau refresh token gaada, kasih error (401)
    if (!refreshToken) {
      const error = new Error("Refresh token tidak ada");
      error.statusCode = 401;
      throw error;
    }

    // Cari user yg punya refresh token yg sama di db
    const user = await User.findOne({
      where: { refresh_token: refreshToken },
    });

    // Fix: check if user is null before accessing user.refresh_token
    if (!user) {
      const error = new Error("Refresh token tidak ada");
      error.statusCode = 401;
      throw error;
    }
    if (!user.refresh_token) {
      const error = new Error("Refresh token tidak ada");
      error.statusCode = 401;
      throw error;
    }
    // Kalo ketemu, verifikasi refresh token
    else {
      jwt.verify(
        refreshToken, // <- refresh token yg mau diverifikasi
        process.env.JWT_REFRESH_SECRET, // <- Secret key dari refresh token
        (error, decoded) => {
          // Jika ada error (access token tidak valid/kadaluarsa), kirim respons error
          if (error) {
            return res.status(403).json({
              status: "Error",
              message: "Refresh token tidak valid",
            });
          }
          // Konversi data user ke bentuk object
          const userPlain = user.toJSON();

          // Hapus data sensitif sebelum membuat token baru, dalam hal ini password sama refresh token dihapus
          const { password: _, refresh_token: __, ...safeUserData } = userPlain;

          // Buat access token baru (expire selama 30 detik)
          const accessToken = jwt.sign(safeUserData, process.env.JWT_SECRET, {
            expiresIn: "30s",
          });

          // Kirim respons sukses + kasih access token yg udah dibikin tadi
          return res.status(200).json({
            status: "Success",
            message: "Berhasil mendapatkan access token.",
            accessToken, // <- Access token baru untuk client
          });
        }
      );
    }
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

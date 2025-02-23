// IncidentReportForm.tsx
import React, { useState } from 'react';

// Types pour notre formulaire
interface IncidentReport {
    scooterId: string;
    testerId: string;
    incidentDate: string;
    incidentType: 'mechanical' | 'electrical' | 'cosmetic' | 'software' | 'other';
    description: string;
    urgencyLevel: 'low' | 'medium' | 'high';
    location: string;
    photosUrls: string[];
}

const IncidentReportForm: React.FC = () => {
    // État initial du formulaire
    const [report, setReport] = useState<IncidentReport>({
        scooterId: '',
        testerId: '',
        incidentDate: new Date().toISOString().split('T')[0], // Date du jour par défaut
        incidentType: 'mechanical',
        description: '',
        urgencyLevel: 'medium',
        location: '',
        photosUrls: [],
    });

    // État pour les fichiers photos
    const [photos, setPhotos] = useState<File[]>([]);

    // État pour les messages d'erreur et de succès
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    // Mise à jour de l'état du formulaire
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setReport({
            ...report,
            [name]: value,
        });
    };

    // Gestion de l'upload de photos
    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newPhotos = [...photos];
            for (let i = 0; i < e.target.files.length; i++) {
                newPhotos.push(e.target.files[i]);
            }
            setPhotos(newPhotos);
        }
    };

    // Supprimer une photo
    const removePhoto = (index: number) => {
        const newPhotos = [...photos];
        newPhotos.splice(index, 1);
        setPhotos(newPhotos);
    };

    // Soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        // Validation basique
        if (!report.scooterId || !report.description || !report.location) {
            setErrorMessage('Veuillez remplir tous les champs obligatoires');
            return;
        }

        try {
            // Simulation d'upload des photos (en situation réelle, on utiliserait une API)
            const mockUploadPhotos = async (): Promise<string[]> => {
                return photos.map((_, index) => `https://api.voltride.com/uploads/photo_${Date.now()}_${index}.jpg`);
            };

            const uploadedPhotoUrls = await mockUploadPhotos();

            // Création du rapport final avec les URLs des photos
            const finalReport = {
                ...report,
                photosUrls: uploadedPhotoUrls,
            };

            // Simulation d'appel API (à remplacer par un vrai appel API)
            console.log('Rapport soumis:', finalReport);

            // Réinitialisation du formulaire après soumission réussie
            setReport({
                scooterId: '',
                testerId: '',
                incidentDate: new Date().toISOString().split('T')[0],
                incidentType: 'mechanical',
                description: '',
                urgencyLevel: 'medium',
                location: '',
                photosUrls: [],
            });
            setPhotos([]);
            setSuccessMessage('Votre signalement a été envoyé avec succès!');
        } catch (error) {
            setErrorMessage('Une erreur est survenue lors de l\'envoi du signalement. Veuillez réessayer.');
            console.error('Erreur lors de la soumission:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Signaler un incident lors d'un essai</h2>

            {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {errorMessage}
                </div>
            )}

            {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="scooterId" className="block text-sm font-medium text-gray-700">
                        ID du Scooter*
                    </label>
                    <input
                        type="text"
                        id="scooterId"
                        name="scooterId"
                        value={report.scooterId}
                        onChange={handleInputChange}
                        placeholder="Ex: SC-2025-VR45"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="testerId" className="block text-sm font-medium text-gray-700">
                        Votre ID de testeur
                    </label>
                    <input
                        type="text"
                        id="testerId"
                        name="testerId"
                        value={report.testerId}
                        onChange={handleInputChange}
                        placeholder="Ex: TS-001"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-700">
                        Date de l'incident*
                    </label>
                    <input
                        type="date"
                        id="incidentDate"
                        name="incidentDate"
                        value={report.incidentDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="incidentType" className="block text-sm font-medium text-gray-700">
                        Type d'incident*
                    </label>
                    <select
                        id="incidentType"
                        name="incidentType"
                        value={report.incidentType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="mechanical">Problème mécanique</option>
                        <option value="electrical">Problème électrique</option>
                        <option value="cosmetic">Dommage esthétique</option>
                        <option value="software">Bug logiciel</option>
                        <option value="other">Autre</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description détaillée*
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={report.description}
                        onChange={handleInputChange}
                        placeholder="Décrivez précisément le problème rencontré..."
                        rows={5}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="urgencyLevel" className="block text-sm font-medium text-gray-700">
                        Niveau d'urgence
                    </label>
                    <select
                        id="urgencyLevel"
                        name="urgencyLevel"
                        value={report.urgencyLevel}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="low">Faible (peut attendre)</option>
                        <option value="medium">Moyen (à traiter prochainement)</option>
                        <option value="high">Élevé (nécessite attention immédiate)</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Lieu de l'incident*
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={report.location}
                        onChange={handleInputChange}
                        placeholder="Adresse ou coordonnées GPS"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
                        Ajouter des photos
                    </label>
                    <input
                        type="file"
                        id="photos"
                        name="photos"
                        onChange={handlePhotoUpload}
                        multiple
                        accept="image/*"
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                        {photos.map((photo, index) => (
                            <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-md text-sm">
                                <span className="truncate max-w-xs">{photo.name}</span>
                                <button
                                    type="button"
                                    onClick={() => removePhoto(index)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between pt-4">
                    <button
                        type="reset"
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Réinitialiser
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Envoyer le signalement
                    </button>
                </div>
            </form>
        </div>
    );
};

export default IncidentReportForm;
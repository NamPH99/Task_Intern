//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WorkManager.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class NGUOIDUNG
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public NGUOIDUNG()
        {
            this.NHANVIENs = new HashSet<NHANVIEN>();
            this.QL_NGUOIDUNGNHOMNGUOIDUNG = new HashSet<QL_NGUOIDUNGNHOMNGUOIDUNG>();
        }
    
        public string TENDN { get; set; }
        public string MATKHAU { get; set; }
        public Nullable<bool> HOATDONG { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NHANVIEN> NHANVIENs { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<QL_NGUOIDUNGNHOMNGUOIDUNG> QL_NGUOIDUNGNHOMNGUOIDUNG { get; set; }
    }
}

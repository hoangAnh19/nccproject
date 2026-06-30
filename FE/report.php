<?php include 'header.php'; ?>
<main class="main-container pl-[280px]">
    <?php include 'sidebar.php'; ?>
    <div class="main-content p-10">
        <div class="flex items-center justify-between border-b border-solid border-[#e2e8f0] pb-10 mb-10">
            <div class="block">
                <div class="page-title">Báo cáo đánh giá nhà cung cấp</div>
                <p>Tổng hợp kết quả và so sánh giữa các kỳ đánh giá.</p>
            </div>
            <div class="block">
                <a href="" class="btn-main">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M12 5v14M5 12h14"></path></svg>
                    Xuất Excel
                </a>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-6 mb-6">
            <div class="item report-chart-column overflow-hidden rounded-4 p-6 bg-white border border-solid border-[#e2e8f0]" id="report-chart-column" style="height: 380px;"></div>
            <div class="item report-chart-line overflow-hidden rounded-4 p-6 bg-white border border-solid border-[#e2e8f0]" id="report-chart-line" style="height: 380px;"></div>
        </div>

        <div class="block overflow-hidden rounded-4 p-6 bg-white border border-solid border-[#e2e8f0] mb-6">
            <div class="grid gap-2 grid-cols-2 text-[14px]">
                <div class="item">
                    <p class="font-semibold mb-1 h-5">Nhà cung cấp</p>
                    <input type="text" class="txt_field w-full h-10 px-5 border border-solid border-[#ebebeb] rounded-2" placeholder="Tìm theo tên Nhà Cung Cấp hoặc Mã số thuế">
                </div>
                <div class="item grid grid-cols-3 gap-2">
                    <div class="item">
                        <p class="font-semibold mb-1 h-5">Kỳ đánh giá</p>
                        <select class="txt_field w-full h-10 px-5 border border-solid border-[#ebebeb] rounded-2 outline-none">
                            <option value="">Tất cả</option>
                            <option value="">Quý I/2026</option>
                            <option value="">Quý II/2026</option>
                            <option value="">Quý III/2026</option>
                            <option value="">Quý IV/2026</option>
                        </select>
                    </div>
                    <div class="item">
                        <p class="font-semibold mb-1 h-5">Loại hình</p>
                        <select class="txt_field w-full h-10 px-5 border border-solid border-[#ebebeb] rounded-2 outline-none">
                            <option value="">Tất cả</option>
                            <option value="">Hàng hóa</option>
                            <option value="">Tư vấn</option>
                            <option value="">Phi tư vấn</option>
                        </select>
                    </div>
                    <div class="item">
                        <p class="font-semibold mb-1 h-5"></p>
                        <button class="w-full h-10 px-5 border border-solid border-[#ebebeb] rounded-2 outline-none font-bold text-white bg-blue !border-blue">Áp dụng</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="block overflow-hidden rounded-4 p-6 bg-white border border-solid border-[#e2e8f0]">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                    <tr>
                        <th>Nhà cung cấp</th>
                        <th class="text-center">A (25%)</th>
                        <th class="text-center">B (30%)</th>
                        <th class="text-center">C (30%)</th>
                        <th class="text-center">D (15%)</th>
                        <th class="text-center">Tổng</th>
                        <th class="text-center">Xếp hạng</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="name">Tập đoàn Công nghệ FPT</div>

                            </td>
                            <td class="text-center">
                                <span class="">88</span>
                            </td>
                            <td class="text-center">
                                <span class="">89.2</span>
                            </td>
                            <td class="text-center">
                                <span class="">90</span>
                            </td>
                            <td class="text-center">
                                <span class="">86</span>
                            </td>
                            <td class="text-center">
                                <span class="font-bold">90.1</span>
                            </td>
                            <td class="text-center">
                                <span class="badge text-[14px] bg-[#16A34A] text-white px-2 py-1 rounded-4">Loại A</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="name">Tập đoàn Công nghệ FPT</div>

                            </td>
                            <td class="text-center">
                                <span class="">88</span>
                            </td>
                            <td class="text-center">
                                <span class="">89.2</span>
                            </td>
                            <td class="text-center">
                                <span class="">90</span>
                            </td>
                            <td class="text-center">
                                <span class="">86</span>
                            </td>
                            <td class="text-center">
                                <span class="font-bold">90.1</span>
                            </td>
                            <td class="text-center">
                                <span class="badge text-[14px] bg-[#16A34A] text-white px-2 py-1 rounded-4">Loại A</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="name">Tập đoàn Công nghệ FPT</div>

                            </td>
                            <td class="text-center">
                                <span class="">88</span>
                            </td>
                            <td class="text-center">
                                <span class="">89.2</span>
                            </td>
                            <td class="text-center">
                                <span class="">90</span>
                            </td>
                            <td class="text-center">
                                <span class="">86</span>
                            </td>
                            <td class="text-center">
                                <span class="font-bold">90.1</span>
                            </td>
                            <td class="text-center">
                                <span class="badge text-[14px] bg-[#16A34A] text-white px-2 py-1 rounded-4">Loại A</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="name">Tập đoàn Công nghệ FPT</div>

                            </td>
                            <td class="text-center">
                                <span class="">88</span>
                            </td>
                            <td class="text-center">
                                <span class="">89.2</span>
                            </td>
                            <td class="text-center">
                                <span class="">90</span>
                            </td>
                            <td class="text-center">
                                <span class="">86</span>
                            </td>
                            <td class="text-center">
                                <span class="font-bold">90.1</span>
                            </td>
                            <td class="text-center">
                                <span class="badge text-[14px] bg-[#2563EB] text-white px-2 py-1 rounded-4">Loại B</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="name">Tập đoàn Công nghệ FPT</div>

                            </td>
                            <td class="text-center">
                                <span class="">88</span>
                            </td>
                            <td class="text-center">
                                <span class="">89.2</span>
                            </td>
                            <td class="text-center">
                                <span class="">90</span>
                            </td>
                            <td class="text-center">
                                <span class="">86</span>
                            </td>
                            <td class="text-center">
                                <span class="font-bold">90.1</span>
                            </td>
                            <td class="text-center">
                                <span class="badge text-[14px] bg-[#2563EB] text-white px-2 py-1 rounded-4">Loại B</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="name">Tập đoàn Công nghệ FPT</div>

                            </td>
                            <td class="text-center">
                                <span class="">88</span>
                            </td>
                            <td class="text-center">
                                <span class="">89.2</span>
                            </td>
                            <td class="text-center">
                                <span class="">90</span>
                            </td>
                            <td class="text-center">
                                <span class="">86</span>
                            </td>
                            <td class="text-center">
                                <span class="font-bold">90.1</span>
                            </td>
                            <td class="text-center">
                                <span class="badge text-[14px] bg-[#2563EB] text-white px-2 py-1 rounded-4">Loại B</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="name">Tập đoàn Công nghệ FPT</div>

                            </td>
                            <td class="text-center">
                                <span class="">88</span>
                            </td>
                            <td class="text-center">
                                <span class="">89.2</span>
                            </td>
                            <td class="text-center">
                                <span class="">90</span>
                            </td>
                            <td class="text-center">
                                <span class="">86</span>
                            </td>
                            <td class="text-center">
                                <span class="font-bold">90.1</span>
                            </td>
                            <td class="text-center">
                                <span class="badge text-[14px] bg-[#F59E0B] text-white px-2 py-1 rounded-4">Loại C</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="name">Tập đoàn Công nghệ FPT</div>

                            </td>
                            <td class="text-center">
                                <span class="">88</span>
                            </td>
                            <td class="text-center">
                                <span class="">89.2</span>
                            </td>
                            <td class="text-center">
                                <span class="">90</span>
                            </td>
                            <td class="text-center">
                                <span class="">86</span>
                            </td>
                            <td class="text-center">
                                <span class="font-bold">90.1</span>
                            </td>
                            <td class="text-center">
                                <span class="badge text-[14px] bg-[#F59E0B] text-white px-2 py-1 rounded-4">Loại C</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="name">Tập đoàn Công nghệ FPT</div>

                            </td>
                            <td class="text-center">
                                <span class="">88</span>
                            </td>
                            <td class="text-center">
                                <span class="">89.2</span>
                            </td>
                            <td class="text-center">
                                <span class="">90</span>
                            </td>
                            <td class="text-center">
                                <span class="">86</span>
                            </td>
                            <td class="text-center">
                                <span class="font-bold">90.1</span>
                            </td>
                            <td class="text-center">
                                <span class="badge text-[14px] bg-[#F59E0B] text-white px-2 py-1 rounded-4">Loại C</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="name">Tập đoàn Công nghệ FPT</div>

                            </td>
                            <td class="text-center">
                                <span class="">88</span>
                            </td>
                            <td class="text-center">
                                <span class="">89.2</span>
                            </td>
                            <td class="text-center">
                                <span class="">90</span>
                            </td>
                            <td class="text-center">
                                <span class="">86</span>
                            </td>
                            <td class="text-center">
                                <span class="font-bold">90.1</span>
                            </td>
                            <td class="text-center">
                                <span class="badge text-[14px] bg-[#DC2626] text-white px-2 py-1 rounded-4">Loại D</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="name">Tập đoàn Công nghệ FPT</div>

                            </td>
                            <td class="text-center">
                                <span class="">88</span>
                            </td>
                            <td class="text-center">
                                <span class="">89.2</span>
                            </td>
                            <td class="text-center">
                                <span class="">90</span>
                            </td>
                            <td class="text-center">
                                <span class="">86</span>
                            </td>
                            <td class="text-center">
                                <span class="font-bold">90.1</span>
                            </td>
                            <td class="text-center">
                                <span class="badge text-[14px] bg-[#DC2626] text-white px-2 py-1 rounded-4">Loại D</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="name">Tập đoàn Công nghệ FPT</div>

                            </td>
                            <td class="text-center">
                                <span class="">88</span>
                            </td>
                            <td class="text-center">
                                <span class="">89.2</span>
                            </td>
                            <td class="text-center">
                                <span class="">90</span>
                            </td>
                            <td class="text-center">
                                <span class="">86</span>
                            </td>
                            <td class="text-center">
                                <span class="font-bold">90.1</span>
                            </td>
                            <td class="text-center">
                                <span class="badge text-[14px] bg-[#DC2626] text-white px-2 py-1 rounded-4">Loại D</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>

<script src="https://code.highcharts.com/highcharts.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function () {
    Highcharts.chart('report-chart-column', {
        chart: {
            type: 'column',
            style: {
                fontFamily: 'Nunito Sans, sans-serif'
            }
        },
        title: {
            text: 'Phân bố phân loại (kỳ hiện tại)',
            align: 'left',
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1e293b'
            }
        },
        xAxis: {
            categories: ['Loại A', 'Loại B', 'Loại C', 'Loại D'],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Số lượng nhà cung cấp'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                borderRadius: 4
            }
        },
        series: [{
            name: 'Số lượng',
            data: [
                { y: 15, color: '#16A34A' }, // Loại A: Green
                { y: 22, color: '#2563EB' }, // Loại B: Blue
                { y: 10, color: '#F59E0B' }, // Loại C: Yellow
                { y: 5, color: '#DC2626' }   // Loại D: Red
            ],
            showInLegend: false
        }],
        credits: {
            enabled: false
        }
    });

    Highcharts.chart('report-chart-line', {
        chart: {
            type: 'line',
            style: {
                fontFamily: 'Nunito Sans, sans-serif'
            }
        },
        title: {
            text: 'So sánh điểm TB qua các kỳ đánh giá',
            align: 'left',
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1e293b'
            }
        },
        xAxis: {
            categories: ['Quý I/2026', 'Quý II/2026', 'Quý III/2026', 'Quý IV/2026']
        },
        yAxis: {
            title: {
                text: 'Điểm trung bình'
            },
            min: 60,
            max: 100
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            }
        },
        series: [{
            name: 'Điểm TB',
            data: [82.5, 85.0, 86.5, 90.1],
            color: '#016b69',
            marker: {
                symbol: 'circle',
                radius: 6
            }
        }],
        credits: {
            enabled: false
        }
    });
});
</script>

<?php include 'footer.php'; ?>
